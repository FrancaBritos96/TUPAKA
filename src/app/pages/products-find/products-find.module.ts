import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ComponentsModule } from 'src/app/components/components.module';
import { ProductsFindComponent } from './products-find.component';
import { ProductsFindRoutingModule } from './products-find-routing.module';


@NgModule({
  declarations: [ProductsFindComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProductsFindRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ComponentsModule,
    MatTableModule
  ]
})
export class ProductsFindModule { }
