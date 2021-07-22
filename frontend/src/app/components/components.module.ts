import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavLateralComponent } from './nav-lateral/nav-lateral.component';
import { MarketComponent } from './market/market.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavLateralComponent,
    MarketComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule,
    MatIconModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NavLateralComponent,
    MarketComponent
  ]
})
export class ComponentsModule { }
