import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOrderListComponent } from './admin-order-list.component';



const routes: Routes = [
  {
    path: '',
    component: AdminOrderListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOrderListRoutingModule { }