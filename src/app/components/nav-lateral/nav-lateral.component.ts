import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/pages/login/services/login.service';

@Component({
  selector: 'app-nav-lateral',
  templateUrl: './nav-lateral.component.html',
  styleUrls: ['./nav-lateral.component.css']
})
export class NavLateralComponent implements OnInit {
  public currentUser: any;
  public userName!: string; 
  
  constructor( private loginService: LoginService) { }

  async ngOnInit() {
    let currentUser = await this.loginService.getCurrentUser(this.loginService.getToken()).toPromise();
    this.currentUser = (Object.values(currentUser))[2];
    this.userName = `${this.currentUser.nombre} ${this.currentUser.apellido}`;
  }

}
