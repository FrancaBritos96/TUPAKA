//import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AdminRoutingModule } from './home-admin-routing.module';
import { HomeAdminComponent } from './home-admin.component';


@NgModule({
  declarations: [HomeAdminComponent], //ResetPasswordComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  entryComponents: [
    //ResetPasswordComponent
  ],
  exports: [
    HomeAdminComponent,
    MatDialogModule
  ],
  providers: []
})
export class HomeAdminModule { }