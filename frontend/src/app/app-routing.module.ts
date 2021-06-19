import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpModule } from 'src/app/pages/sign-up/sign-up.module';
import { HomeModule } from './pages/home/home.module';



const routes: Routes = [
    {
      path:'',
      loadChildren:()=> import('src/app/pages/home/home.module').then(m=>HomeModule)
    },
    {
      path: 'signUp',
      loadChildren:()=> import('src/app/pages/sign-up/sign-up.module').then(m=>SignUpModule)
    },
    {
      path: 'login',
      loadChildren: () => import('./pages/login/login.module').then(m=>LoginModule)
    },
    {
      path: 'admin',
      loadChildren: () => import('./pages/home-admin/home-admin.module').then(m=>HomeAdminModule)
    },
    {
      path: 'products',
      loadChildren: () => import('./pages/products/products.module').then(m=>ProductsModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
