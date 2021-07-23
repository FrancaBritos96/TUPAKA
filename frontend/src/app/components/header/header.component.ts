
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../pages/login/services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/models/IUser';
//import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'src/utils/alert.service';
import { of } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public currentUser: any;
  public userName: string = "";
  public isAuthenticated!: boolean;
  public isAdminRol!: boolean;
  public isAdminPage!: boolean

  constructor(public router: Router, private loginService: LoginService, private alertsService: AlertsService) { }

  async ngOnInit()  {
    await this.setAdminRol();
    this.isAdminPage = JSON.parse(localStorage.getItem("isAdminPage")!); 
    if (localStorage.getItem("accessToken")) {
      this.isAuthenticated = true;
      let currentUser = await this.loginService.getCurrentUser(this.loginService.getToken()).toPromise();
      this.currentUser = (Object.values(currentUser))[2];
      this.userName = `${this.currentUser.nombre} ${this.currentUser.apellido}`;
      if (this.currentUser.idRol == 1) {
        this.isAdminRol = true;
      }
      else{
        this.isAdminRol = false;
      }
    }
  }

  async setAdminRol(){
    let currentUrl = window.location.href.slice(21);
    if (currentUrl === '/' || currentUrl === '' || currentUrl === '/login' || currentUrl === '/signUp' 
    || currentUrl === '/createOrder' || currentUrl === '/comingSoon' || currentUrl === '/#close'){
      localStorage.setItem("isAdminPage", "false");
    }
    else {
      localStorage.setItem("isAdminPage", "true");
    }
  }

  goToLogin() {
    // this.router.navigate(['/signUp']);
    window.location.href = '/login';
    window.scrollTo(0, 0);
  }

  goToShoppingCart() {
    // this.router.navigate(['/signUp']);
    window.location.href = '/createOrder';
    window.scrollTo(0, 0);
  }

  goToAdminHome() {
    // this.router.navigate(['/signUp']);
    window.location.href = '/admin';
    window.scrollTo(0, 0);
  }

  logOut() {
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
