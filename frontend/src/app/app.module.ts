import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsComponent } from './pages/products/products.component';
import { CategoryComponent } from './pages/category/category.component';
import { SizesComponent } from './pages/sizes/sizes.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductUpdateComponent } from './pages/product-update/product-update.component';
import { ProductsFindComponent } from './pages/products-find/products-find.component';
import { AdminNewOrderComponent } from './pages/admin-new-order/admin-new-order.component';
import { AdminOrderListComponent } from './pages/admin-order-list/admin-order-list.component';
import { AdminOrderFindComponent } from './pages/admin-order-find/admin-order-find.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SizesComponent,
    //ComingSoonComponent,
    // AdminNewOrderComponent,
    // AdminOrderListComponent,
    // AdminOrderFindComponent,
    //ProductsFindComponent,
    //ProductUpdateComponent,
    //ProductsListComponent,
    //ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
