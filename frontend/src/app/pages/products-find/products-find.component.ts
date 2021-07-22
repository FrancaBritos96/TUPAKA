import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from 'src/models/ICategory';
import { INewProducts } from 'src/models/INewProduct';
import { ISizes } from 'src/models/iSizes';
import { AlertsService } from 'src/utils/alert.service';
import { CategoryService } from '../category/services/category.service';
import { LoginService } from '../login/services/login.service';
import { FileUploadService } from '../products/services/file-upload.service';
import { NewProductService } from '../products/services/products.service';
import { SizeService } from '../sizes/services/sizes.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-products-find',
  templateUrl: './products-find.component.html',
  styleUrls: ['./products-find.component.css']
})
export class ProductsFindComponent implements OnInit {


  categories: ICategory[] = [];
  size: ISizes[] = [];
  ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = ['id_producto', 'id_categoria', 'id_estado', 'id_tamano', 'nombre', 'descripcion', 'precio', 'stock', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  products: any[] = [];
  // data: any[] = [];
  // userToUpdate: any;
  //showSpinner = false;
  public isAuthenticated!: boolean;
  public isAdminRol!: boolean;

  public createProductListForm!: FormGroup;

  constructor(public fb: FormBuilder, private productSvc: NewProductService, private categorySvc: CategoryService, private sizeSvc: SizeService, private fileUploadService: FileUploadService, private loginService: LoginService, private alertsService: AlertsService) { }

  async ngOnInit(): Promise<void> {
    //this.showSpinner = true;
    debugger;
    //await this.getProductsListByName();
    //await this.setElementData();
    //await this.setDataSoruce();


  }

  async setElementData() {
    debugger;
    for (let product of this.products) {
      let categoryResponse = await this.categorySvc.getCategoryById(this.loginService.getToken(), product.id_categoria).toPromise();
      let category: any = (Object.values(categoryResponse))[2];
      let categoryName = category[0].nombre;

      let sizeResponse = await this.sizeSvc.getSizeById(this.loginService.getToken(), product.id_tamano).toPromise();
      let size: any = (Object.values(sizeResponse))[2];
      let sizeName = size[0].nombre;

      let productToPush = {
        id_producto: product.id_producto, id_categoria: categoryName, id_estado: product.id_estado, id_tamano: sizeName, nombre: product.nombre, descripcion: product.descripcion,
        precio: product.precio, stock: product.stock
      }
      debugger;

      this.ELEMENT_DATA.push(productToPush);
      debugger;
    }
  }

  async getProductsListByName() {
    debugger;
    
    this.ELEMENT_DATA = [];
   
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

    let productName = ((document.getElementById("nombre") as HTMLInputElement).value)

    let products = await this.productSvc.getProductsByName(this.loginService.getToken(), productName).toPromise();
    debugger;
    this.products = (Object.values(products))[2];
    debugger;


    await this.setElementData();
    await this.setDataSoruce();
    debugger;

  }

  async setDataSoruce() {
    debugger;
    // this.ELEMENT_DATA=this.products.data;
    this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    debugger;
  }

  async deleteProduct(id_producto: number) {


    this.alertsService.questionMessage("¿Desea eliminar el producto seleccionado?", "Atención", 'Sí', 'Cancelar')

      .then(async (result) => {

        if (result.value) {


          let productResult = await this.productSvc.deleteProduct(id_producto, this.loginService.getToken()).toPromise();
          debugger;
          let resultMessage: any = (Object.values(productResult)[1]);
          debugger;
          if (resultMessage == "Producto eliminado con exito") {
            this.alertsService.confirmMessage("Producto eliminado con exito")
              .then((result) => { window.location.href = '/productsList' });

          } else {
            debugger;
            this.alertsService.errorMessage(resultMessage);
          }
        }

      });
  }

  goToUpdateProduct(id_producto: number) {

    window.location.href = `/productsUpdate/${id_producto}`;

  }

  clearSearch() {

    window.location.href = '/productsFind';

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


}
