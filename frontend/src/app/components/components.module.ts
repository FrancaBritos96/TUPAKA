import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavLateralComponent } from './nav-lateral/nav-lateral.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavLateralComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NavLateralComponent
  ]
})
export class ComponentsModule { }
