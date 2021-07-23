import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsFindComponent } from './products-find.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsFindComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsFindRoutingModule { }