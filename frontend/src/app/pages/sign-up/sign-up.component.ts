import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertsService } from 'src/utils/alert.service';
import { SignUpService } from './service/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(public fb:FormBuilder, private signUpService: SignUpService, private alertsService: AlertsService) { }

  createUserForm= this.fb.group({
    nombre:["Gustavo",[Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
    apellido:["", Validators.required],
    numero_documento:["", [Validators.required, Validators.maxLength(8), Validators.minLength(6)]],
    email:["", [Validators.required, Validators.email]],
    telefono:["", Validators.pattern(/^(15|11|\+5411|\+5415|5415|5411)?[2-9]\d{7}$/)],
    password:["", Validators.required],
    nacionalidad:[""],
    provincia:[""],
    localidad:[""],
    direccion:[""],
    cod_postal:[""]
  })

  createUser(){
    console.log(this.createUserForm.valid)
    if(this.createUserForm.valid){
      let t = 3;

      this.signUpService.createUser(this.createUserForm.value).subscribe(data =>{
        debugger;
        if(data.mensaje == "Usuario creado con exito"){
          this.alertsService.confirmMessage("Cuenta creada exitosamente")
          .then((result) => { window.location.href = '/' });
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


  ngOnInit(): void {
    localStorage.setItem("scrolledNavBar", "true");
  }

}
