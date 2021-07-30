import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/models/IUser';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'src/utils/alert.service';
import { LoginService } from '../login/services/login.service';
import { CategoryService } from '../category/services/category.service';
import { SizeService } from '../sizes/services/sizes.service';
import { Size } from 'src/models/iSizes';
import { FileUploadService } from '../products/services/file-upload.service';
import { NewProductService } from '../products/services/products.service';
import { Category } from 'src/models/ICategory';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements AfterViewInit {
  public isAuthenticated!: boolean;
  public isAdminRol!: boolean;

  public updateProductForm!: FormGroup;
  public selectedCategoryId: number = 0;
  public categories: Category[] = [];
  public selectedSizeId: number = 0;
  public sizes: Size[] = [];
  public fileName: string[] = [];
  public files: any[] = [];
  public filesFormData: any;
  public id_product: number = 0;
  public currentProduct: any;

  constructor(public fb: FormBuilder, public router: Router, private productSvc: NewProductService, private categorySvc: CategoryService, private sizeSvc: SizeService, private fileUploadService: FileUploadService, private loginService: LoginService, private alertsService: AlertsService) {

    localStorage.setItem("scrolledNavBar", "true");
    this.getCategorias();
    this.getSizes();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.getIdProduct();
    this.updateProductForm = new FormGroup({
      id_categoria: new FormControl(this.currentProduct[0].nombre, [Validators.required]),
      id_tamano: new FormControl('', [Validators.required]),
      nombre: new FormControl(`${this.currentProduct[0].nombre}`, [Validators.required]),
      descripcion: new FormControl(`${this.currentProduct[0].descripcion}`, [Validators.required]),
      precio: new FormControl(`${this.currentProduct[0].precio}`, [Validators.required, Validators.pattern("^[0-9]*$")]),
      stock: new FormControl(`${this.currentProduct[0].stock}`, [Validators.required, Validators.pattern("^[0-9]*$")]),

    });
  }

  async getIdProduct() {
    this.id_product = Number((this.router.url).substr(16, (this.router.url).length));
    let currentProduct = await this.productSvc.getProductsById(this.loginService.getToken(), this.id_product).toPromise();
    this.currentProduct = (Object.values(currentProduct))[2];
  }

  //////////////////Imagenes/////////////

  private validar(event: any): Boolean {
    const maxSize = 500000000;
    this.files = event.target.files
    this.fileName = [];
    for (let file of this.files) {
      this.fileName.push(file.name);
    }

    if (this.files.length < 0) {
      console.log("No se adjunto ningun archivo")
      this.files = [];
      this.fileName = [];
      return false
    }

    if (this.files[0].size > maxSize) {
      console.log("ha superado el tamaño permitido")
      this.files = [];
      this.fileName = [];
      return false
    }

    if (this.files[0].type != 'image/png' && this.files[0].type != 'image/jpg' && this.files[0].type != 'image/jpeg') {
      console.log("El formato no es el permitido")
      this.files = [];
      this.fileName = [];
      return false
    }
    return true
  }

  onFileChange(event: any) {
    const validacion = this.validar(event)
    if (validacion) {
      this.filesFormData = new FormData();

      for (let i = 0; i < this.files.length; i++) {
        this.filesFormData.append('image', this.files[i], this.fileName[i]);
      }
    }

  }

  //////////////////////
  getCategorias() {
    this.categorySvc.getCategories(this.loginService.getToken()).subscribe
      (
        //data => console.log((Object.values(data))[2]
        data => this.categories = (Object.values(data))[2]
      )
  };
  onSelect(categoryId: any): void {
    this.selectedCategoryId = categoryId.value;
  }

  getSizes() {
    this.sizeSvc.getAllSize(this.loginService.getToken()).subscribe
      (
        //data => console.log((Object.values(data))[2]
        data => this.sizes = (Object.values(data))[2]
      )
  }

  onSelectSize(sizeId: any): void {
    this.selectedSizeId = sizeId.value;
  }

  async updateProduct() {
    this.alertsService.questionMessage("¿Desea editar el producto seleccionado?", "Atención", 'Sí', 'Cancelar')
      .then(async (result) => {
        if (result.value) {
          let productResult = await this.productSvc.updateProduct(this.id_product, this.updateProductForm.value, this.loginService.getToken()).toPromise();
          let resultMessage: any = (Object.values(productResult)[1]);
          if (resultMessage == "Producto editado con exito") {
            if (this.filesFormData) {
              await this.fileUploadService.sendFile(this.filesFormData, this.id_product, this.loginService.getToken()).toPromise();
            }
            this.alertsService.confirmMessage("Producto editado con exito")
              .then((result) => { window.location.href = '/productsList' });
          } else {
            this.alertsService.errorMessage(resultMessage);
          }
        }

      });
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

  goToHome() {
    // this.router.navigate(['/signUp']);
    window.location.href = '';
    window.scrollTo(0, 0);
  }
}


