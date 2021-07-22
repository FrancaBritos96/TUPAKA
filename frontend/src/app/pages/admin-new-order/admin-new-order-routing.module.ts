import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminNewOrderComponent } from './admin-new-order.component';



const routes: Routes = [
  {
    path: '',
    component: AdminNewOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminNewOrderRoutingModule { }