import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { ProductsUpdateRoutingModule } from './product-update-routing.module';

import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProductUpdateComponent } from './product-update.component';



@NgModule({
  declarations: [ProductUpdateComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ComponentsModule,
    ProductsUpdateRoutingModule,
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class ProductUpdateModule { }
