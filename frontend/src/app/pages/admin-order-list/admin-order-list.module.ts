import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ComponentsModule } from 'src/app/components/components.module';
import { AdminOrderListComponent } from './admin-order-list.component';
import { AdminOrderListRoutingModule } from './admin-order-list-routing.module';
import {MatTableModule} from '@angular/material/table';




@NgModule({
  declarations: [AdminOrderListComponent],
  imports: [
    CommonModule,
    AdminOrderListRoutingModule,
    ComponentsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatTableModule
  ]
})
export class AdminOrderListModule { }
