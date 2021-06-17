import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './pages/home/home.module';



const routes: Routes = [
    {
      path:"",
      loadChildren:()=> import('src/app/pages/home/home.module').then(m=>HomeModule)
    },
    {
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'admin',
      loadChildren: () => import('./pages/home-admin/home-admin.module').then(m => m.HomeAdminModule)
    },
    {
      path: 'products',
      loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
