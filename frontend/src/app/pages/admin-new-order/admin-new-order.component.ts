import { Component, OnInit } from '@angular/core';
import { AlertsService } from 'src/utils/alert.service';

@Component({
  selector: 'app-admin-new-order',
  templateUrl: './admin-new-order.component.html',
  styleUrls: ['./admin-new-order.component.css']
})
export class AdminNewOrderComponent implements OnInit {
  public isAuthenticated!: boolean;
  public isAdminRol!: boolean;

  constructor(private alertsService: AlertsService) { }

  ngOnInit(): void {
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
