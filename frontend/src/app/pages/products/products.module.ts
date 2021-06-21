import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { ProductsRoutingModule } from './products-rounting.module';

import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ProductsComponent } from './products.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [ProductsComponent],
  
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ProductsRoutingModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ComponentsModule
  ],
//   exports:[
// ProductsComponent,
// MatDialogModule
//   ],
  providers: []

})
export class ProductsModule { }

