//import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CreateOrderComponent } from './create-order.component';
import { CreateOrderRoutingModule } from './create-order-routing.module';
import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatSelectModule} from '@angular/material/select'


@NgModule({
  declarations: [CreateOrderComponent], //ResetPasswordComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CreateOrderRoutingModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule
  ],
  entryComponents: [
    //ResetPasswordComponent
  ],
  exports: [
    CreateOrderComponent
  ],
  providers: []
})
export class CreateOrderModule { }