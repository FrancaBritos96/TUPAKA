import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/models/IUser';
//import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'src/utils/alerts.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder, private loginService:LoginService,  private alertsService: AlertsService) { }

  formLogin = this.fb.group({

    password:["", Validators.required],
       email:["",[Validators.required,  Validators.email]]

  })

  login(){
    
    let user = new User;
    user.email = this.formLogin.value.email;
        user.password = this.formLogin.value.password;
            this.loginService.login(user).subscribe(data => {
             
             //this.loginService.setUser(data.payload.user);
             
               this.loginService.setToken(data.token);
              this.alertsService.confirmMessage("Inicio de sesión exitoso")
              .then((result) => { window.location.href = '/' });
            },
              error => {
                if (error.error.error.code == 400) {
                  this.alertsService.errorMessage("Email y/o contraseña incorrectos")
        
                  return;
                }
                if (error.error.error.code == 401) {
                  this.alertsService.errorMessage("Usuario bloqueado, comuníquese con el administrador desde la sección contáctenos.")
                  return;
                }
                this.alertsService.errorMessage("Email y/o contraseña incorrectos");
              }
            );
          }

    

  ngOnInit(): void {
  }

}

