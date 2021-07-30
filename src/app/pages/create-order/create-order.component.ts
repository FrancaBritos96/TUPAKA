import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/IUser';
//import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { AlertsService } from 'src/utils/alert.service';
import { LoginService } from '../login/services/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddOrderService } from 'src/utils/order.service';
import { NewProductService } from '../products/services/products.service';
import { DomSanitizer } from '@angular/platform-browser';
import { createOrderService } from './services/create-order.service';


export interface orderDetail {
  producto: string;
  position: number;
  precio: number;
  cantidad: number;
  stock: number[];
  subtotal: number;
  incluir: number;
  imagenSrc: any
}

@Component({
  selector: 'app-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  ELEMENT_DATA: orderDetail[] = [];
  displayedColumns: string[] = ['position', 'producto', 'precio', 'cantidad', 'subtotal', 'incluir'];
  dataSource = new MatTableDataSource<orderDetail>(this.ELEMENT_DATA);
  formUser!: FormGroup;
  currentUser: any;
  orderDetails: any[] = [];
  currentPrice: number = 0;

  constructor(public fb: FormBuilder, private loginService: LoginService, private alertsService: AlertsService, private addOrderService: AddOrderService,
    private productService: NewProductService, private sanitizer: DomSanitizer, private createOrderService: createOrderService) { }

  async ngOnInit(): Promise<void> {
    localStorage.setItem("scrolledNavBar", "true");
    let currentUser = await this.loginService.getCurrentUser(this.loginService.getToken()).toPromise();
    this.currentUser = (Object.values(currentUser))[2];
    let nombre = `${this.currentUser.nombre} ${this.currentUser.apellido}`;
    this.formUser = new FormGroup({
      user: new FormControl(''),
      email: new FormControl(`${this.currentUser.email}`)
    });
    this.formUser.controls.user.disable();
    await this.setOrderDetails();
    await this.setElementData();
    await this.setDataSoruce();
  }

  async setOrderDetails() {
    this.orderDetails = await this.addOrderService.getOrderDetails();
  }

  async setElementData() {
    for (let i = 0; i < this.orderDetails.length; i++) {
      let imagenSrc: any = "assets/images/unnamed.jpg";
      let stock = Array(this.orderDetails[i].stock).fill(1).map((x, i) => i + 1);

      let imagesResponse = await this.productService.getImagesByProductId(this.orderDetails[i].id_producto).toPromise();
      let imagesProductList = ((Object.values(imagesResponse))[2]);
      if (imagesProductList.length > 0) {
        let mainImageProductData = imagesProductList[0];
        let mainImageProductPhoto = await this.productService.getImage(this.orderDetails[i].id_producto, mainImageProductData.nombre).toPromise();
        let unsafeImageUrl = URL.createObjectURL(mainImageProductPhoto);
        imagenSrc = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
      }

      let orderDetailToPush = {
        position: i + 1, producto: this.orderDetails[i].nombre, precio: this.orderDetails[i].precio, cantidad: 1, stock: stock, subtotal: this.orderDetails[i].precio,
        incluir: 1, imagenSrc: imagenSrc
      }

      this.ELEMENT_DATA.push(orderDetailToPush);
      this.currentPrice += this.orderDetails[i].precio;
    }
  }

  async setDataSoruce() {
    this.dataSource = new MatTableDataSource<orderDetail>(this.ELEMENT_DATA);
  }

  async enableOrderDetail(checked: boolean, orderDetailIndex: number) {
    this.ELEMENT_DATA[orderDetailIndex].incluir = Number(checked);
    await this.setDataSoruce();
    if (checked) {
      this.currentPrice += this.ELEMENT_DATA[orderDetailIndex].subtotal;
    }
    else {
      this.currentPrice -= this.ELEMENT_DATA[orderDetailIndex].subtotal;
    }
  }

  async changeSubTotal(event: any, orderDetailIndex: number) {
    this.ELEMENT_DATA[orderDetailIndex].cantidad = Number(event.value);
    let subTotalCache = this.ELEMENT_DATA[orderDetailIndex].subtotal;
    this.ELEMENT_DATA[orderDetailIndex].subtotal = this.ELEMENT_DATA[orderDetailIndex].precio * Number(event.value);
    await this.setDataSoruce();
    this.currentPrice += (this.ELEMENT_DATA[orderDetailIndex].subtotal - subTotalCache);
  }

  async payOrder() {
    debugger;
    //  displayedColumns: string[] = ['position', 'producto', 'precio', 'cantidad', 'subtotal', 'incluir'];
    let newOrderResponse = await this.createOrderService.createOrder(this.loginService.getToken()).toPromise();
    debugger;
    let newOrderId :any = (Object.values(newOrderResponse))[2];
    debugger;
    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      if (this.ELEMENT_DATA[i].incluir == 1) {
        let orderDetail = {
          id_pedido: newOrderId, id_producto: this.orderDetails[i].id_producto, cantidad: this.ELEMENT_DATA[i].cantidad };
          await this.createOrderService.createDetailOrder(this.loginService.getToken(), orderDetail).toPromise();
      }
    }
    let payment = {precio: this.currentPrice}
    await this.createOrderService.payment(this.loginService.getToken(), payment).toPromise();
  }
}
