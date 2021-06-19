//import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [LoginComponent], //ResetPasswordComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    LoginRoutingModule,
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
    LoginComponent,
    MatDialogModule
  ],
  providers: []
})
export class LoginModule { }