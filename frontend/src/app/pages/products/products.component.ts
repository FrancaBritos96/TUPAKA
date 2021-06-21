import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { User } from 'src/models/IUser';
//import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from 'src/utils/alert.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
