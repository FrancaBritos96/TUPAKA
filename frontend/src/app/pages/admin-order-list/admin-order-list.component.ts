import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertsService } from 'src/utils/alert.service';
import { LoginService } from '../login/services/login.service';
import { FileUploadService } from '../products/services/file-upload.service';
import { MatTableDataSource } from '@angular/material/table';
import { OrderListService } from './services/admin-order-list.service';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent implements OnInit {

  // SELECT U.nombre as 'NOMBRE CLIENTE', U.apellido as 'APELLIDO CLIENTE'," +
  // " U.documento as 'NRO_DOC', PR.nombre as 'NOMBRE PRODUCTO', DP.cantidad as 'CANTIDAD', DP.precio_unitario as 'PRECIO PRODUCTO',"+
  // " DP.precio_total as 'PRECIO TOTAL POR CANTIDAD', DP.descuento as 'DESCUENTO',E.nombre as 'ESTADO', "+
  // "P.fecha as 'FECHA PEDIDO' 

  ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = ['U.nombre', 'U.apellido', 'U.documento', 'PR.nombre', 'DP.cantidad', 'DP.precio_unitario', 'DP.precio_total', 'DP.descuento',  'E.nombre', 'P.fecha', 'factura', 'editar', 'pagos', 'eliminar'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  orders: any[] = [];

  public createOrderListForm!: FormGroup;
  public isAuthenticated!: boolean;
  public isAdminRol!: boolean;
  
  constructor(public fb:FormBuilder, private orderListSvc: OrderListService, private fileUploadService:FileUploadService, private loginService: LoginService, private alertsService: AlertsService) { }

 async ngOnInit(): Promise<void> {

    await this.getOrderList();
    await this.setElementData();
    await this.setDataSoruce();
  }

  logout() {
    this.alertsService.questionMessage("¿Deseas cerrar sesión? Se perderán los pedidos si hubiese en carrito de compras sin confirmar", "Atención", "Si", "No")
    .then((result) => {
      if (result.value) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("orderDetails");
        this.isAuthenticated = false;
        this.isAdminRol = false;
        window.location.href = '';    
      }
    });
  }

  async setElementData() {
    for (let order of this.orders) {
        let fecha = order.FECHA_PEDIDO.slice(0, 10);
        order.FECHA_PEDIDO = fecha;

      this.ELEMENT_DATA.push(order);
    }
  }

  async getOrderList() {
     let orders = await this.orderListSvc.getOrderList(this.loginService.getToken()).toPromise();
     this.orders = (Object.values(orders))[2];
    }
  
   async setDataSoruce() {
         // this.ELEMENT_DATA=this.products.data;
         this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    }
  
    goToHome() {
      // this.router.navigate(['/signUp']);
      window.location.href = '';
      window.scrollTo(0, 0);
    }

}
