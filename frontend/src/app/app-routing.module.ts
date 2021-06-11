import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './pages/home/home.module';



const routes: Routes = [
    {
      path:"",
      loadChildren:()=> import('src/app/pages/home/home.module').then(m=>HomeModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
