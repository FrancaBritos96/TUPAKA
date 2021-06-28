import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/models/IUser';
//import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'src/utils/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder, private loginService: LoginService, private alertsService: AlertsService) { }

  formLogin = this.fb.group({

    password: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]]

  })

  login() {
    debugger;
    let user = new User;
    user.email = this.formLogin.value.email;
    user.password = this.formLogin.value.password;
    this.loginService.login(user).subscribe(data => {

      if (data.mensaje == "¡LOGIN CORRECTO!") {
        debugger;
        this.loginService.setToken(data.token);
        debugger;
        this.alertsService.confirmMessage("Inicio de sesión exitoso")
          .then(() => { window.location.href = '/' });
      }
      else {
        this.alertsService.errorMessage(data.mensaje);
      }
    });
  }

  ngOnInit(): void {
    localStorage.setItem("scrolledNavBar", "true");
  }
}

