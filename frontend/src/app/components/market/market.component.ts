import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/pages/login/services/login.service';
import { NewProductService } from 'src/app/pages/products/services/products.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {
  products: any[] = [];
  htmlLeftProducts: any[] = [];
  htmlRightProducts: any[] = [];
  index: number[] = [];

  constructor(private productService: NewProductService, private loginService: LoginService) { }

  async ngOnInit(): Promise<void> {
    debugger;
    await this.getProductsList();
    await this.setProductsSubList();
    debugger;
  }

  async getProductsList() {
     let products = await this.productService.getAllProducts(this.loginService.getToken()).toPromise();
     this.products = (Object.values(products))[2];
    }

    async setProductsSubList() {
      debugger;
      this.htmlLeftProducts = this.products.filter(product => (this.products.indexOf(product) % 2 == 0));
      this.htmlRightProducts = this.products.filter(product => (this.products.indexOf(product) % 2 != 0));
    }
    

}
