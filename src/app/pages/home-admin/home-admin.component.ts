import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertsService } from 'src/utils/alert.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit,OnDestroy {
  public isAuthenticated!: boolean;
  public isAdminRol!: boolean;

  constructor(private alertsService: AlertsService) { }

  ngOnInit(): void {
    localStorage.setItem("idAdminPage", "true");
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

  ngOnDestroy() {
    localStorage.setItem("idAdminPage", "false");
  }

  goToHome() {
    // this.router.navigate(['/signUp']);
    window.location.href = '';
    window.scrollTo(0, 0);
  }
}
