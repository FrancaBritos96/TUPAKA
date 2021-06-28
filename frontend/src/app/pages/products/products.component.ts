import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/models/IUser';
//import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'src/utils/alert.service';
import { Category } from 'src/models/ICategory';
import { LoginService } from '../login/services/login.service';
import { CategoryService } from '../category/services/category.service';
import { SizeService } from '../sizes/services/sizes.service';
import { Size } from 'src/models/iSizes';
import { FileUploadService } from './services/file-upload.service';
import { NewProductService } from './services/products.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public selectedCategoryId: number = 0;
  public categories: Category[] = [];

  public selectedSizeId: number = 0;
  public sizes: Size[] = [];

  public fileName=""
  public file:any

  public createProductForm!: FormGroup;
  
  constructor(public fb:FormBuilder, private productSvc: NewProductService, private categorySvc: CategoryService, private sizeSvc: SizeService,private fileUploadService:FileUploadService, private loginService: LoginService, private alertsService: AlertsService) { }

  



  ngOnInit(): void {

    localStorage.setItem("scrolledNavBar", "true");
    this.getCategorias();
    this.getSizes();
    
    this.createProductForm = new FormGroup({
      id_categoria: new FormControl('', [Validators.required]),
      id_tamano: new FormControl(''),
      nombre: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
 
    });
    
  }

  
//////////////////Imagenes/////////////


  private validar(event:any):Boolean{
    const maxSize = 500000;
    this.file = event.target.files
    this.fileName = event.target.files[0].name

    if(this.file.length < 0){
      console.log("No se adjunto ningun archivo")
      this.file = "";
      this.fileName = "Error en validacion"
      return false
    }

    if(this.file[0].size > maxSize){
      console.log("ha superado el tamaño permitido")
      this.file = ""
      this.fileName = "Error en validacion"
      return false
    }

    if(this.file[0].type != 'image/png' ){
      console.log("El formato no es el permitido")
      this.file = ""
      this.fileName = "Error en validacion"
      return false
    }

    return true

  }

  onFileChange(event:any){

    const validacion = this.validar(event)

    if(validacion){
      let file = new FormData()
      file.append('imag', this.file[0], this.fileName);

      this.fileUploadService.sendFile(file).subscribe(resp=>{
        console.log(resp)
      })
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
    this.sizeSvc.getSize(this.loginService.getToken()).subscribe
      (
        //data => console.log((Object.values(data))[2]
        data => this.sizes = (Object.values(data))[2]
      )
  };
  onSelectSize(sizeId: any): void {
        this.selectedSizeId = sizeId.value;
    

  }


  

  async createProduct(){
    console.log(this.createProductForm.valid)
    if(this.createProductForm.valid){
      
      this.productSvc.newProduct(this.createProductForm.value, this.loginService.getToken()).subscribe(data =>{
        debugger;
        if(data.mensaje == "Producto creado con exito"){
          debugger;
          this.alertsService.confirmMessage("Producto creada exitosamente")
          //.then(() => { window.location.href = '/' });

        //  localStorage.setItem("token", resp.token);
         // this.authService.authenticate()
         // console.log("estado auth", this.authService.authState)

        }
        else{
          this.alertsService.errorMessage(data.mensaje);
         // console.log("estado auth", this.authService.authState)
        }
      })
    }
  }

}
