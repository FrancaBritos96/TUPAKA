import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpModule } from 'src/app/pages/sign-up/sign-up.module';
import { CreateOrderModule } from './pages/create-order/create-order.module';
import { AdminNewOrderModule } from './pages/admin-new-order/admin-new-order.module';
import { AdminOrderListModule } from './pages/admin-order-list/admin-order-list.module';
import { ComingSoonModule } from './pages/coming-soon/coming-soon.module';
import { HomeAdminModule } from './pages/home-admin/home-admin.module';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { ProductUpdateModule } from './pages/product-update/product-update.module';
import { ProductsFindModule } from './pages/products-find/products-find.module';
import { ProductsListModule } from './pages/products-list/products-list.module';
import { ProductsModule } from './pages/products/products.module';



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
    },
    {
      path: 'productsList',
      loadChildren: () => import('./pages/products-list/products-list.module').then(m=>ProductsListModule)
    },
    {
      path: 'createOrder',
      loadChildren: () => import('./pages/create-order/create-order.module').then(m=>CreateOrderModule)
    },
    {
      path: 'productsUpdate/:id_producto',
      loadChildren: () => import('./pages/product-update/product-update.module').then(m=>ProductUpdateModule)
    },
    {
      path: 'productsFind',
      loadChildren: () => import('./pages/products-find/products-find.module').then(m=>ProductsFindModule)
    },
    {
      path: 'newOrder',
      loadChildren: () => import('./pages/admin-new-order/admin-new-order.module').then(m=>AdminNewOrderModule)
    },
    {
      path: 'orderList',
      loadChildren: () => import('./pages/admin-order-list/admin-order-list.module').then(m=>AdminOrderListModule)
    },
    {
      path: 'comingSoon',
      loadChildren: () => import('./pages/coming-soon/coming-soon.module').then(m=>ComingSoonModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
