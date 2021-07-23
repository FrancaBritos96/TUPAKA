import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ComponentsModule } from 'src/app/components/components.module';
import { AdminNewOrderRoutingModule } from './admin-new-order-routing.module';
import { AdminNewOrderComponent } from './admin-new-order.component';




@NgModule({
  declarations: [AdminNewOrderComponent],
  imports: [
    CommonModule,
    AdminNewOrderRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ComponentsModule
  ]
})
export class AdminNewOrderModule { }
