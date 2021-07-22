import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/pages/login/services/login.service';
import { NewProductService } from 'src/app/pages/products/services/products.service';
import { SizeService } from 'src/app/pages/sizes/services/sizes.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertsService } from 'src/utils/alert.service';
import { AddOrderService } from 'src/utils/order.service';

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
  productPicturesSrc: any[] = [];
  newOrder: any;
  buttonText = "Agregar al carrito";
  currentUser: any;

  constructor(private productService: NewProductService, private loginService: LoginService, private sizeService: SizeService,
    private sanitizer: DomSanitizer, private alertsService: AlertsService, private addOrderService: AddOrderService) { }

  async ngOnInit(): Promise<void> {
    debugger;
    await this.getProductsList();
    await this.getProductSizes();
    await this.setProductsSubList();
    debugger;
  }

  async getProductsList() {
    debugger;
    let products = await this.productService.getAllProducts().toPromise();
    this.products = (Object.values(products))[2];
  }

  async setProductsSubList() {
    debugger;
    this.htmlLeftProducts = this.products.filter(product => (this.products.indexOf(product) % 2 == 0));
    this.htmlRightProducts = this.products.filter(product => (this.products.indexOf(product) % 2 != 0));
    debugger;
  }

  async getProductSizes() {
    debugger;
    let finalProductsList: any[] = [];
    for (let product of this.products) {
      let isInMarket: number = 0;
      let isInMarketText: string = 'Agregar al carrito';
      let imagenSrc: any = "assets/images/unnamed.jpg";
      let sizeResponse = await this.sizeService.getSizeById(product.id_tamano).toPromise();
      let size: any = (Object.values(sizeResponse))[2];
      let ancho = size[0].ancho;
      let profundidad = size[0].profundidad;
      let alto = size[0].alto;
      let imagesResponse = await this.productService.getImagesByProductId(product.id_producto).toPromise();
      let imagesProductList = ((Object.values(imagesResponse))[2]);
      if (imagesProductList.length > 0) {
        let mainImageProductData = imagesProductList[0];
        let mainImageProductPhoto = await this.productService.getImage(product.id_producto, mainImageProductData.nombre).toPromise();
        let unsafeImageUrl = URL.createObjectURL(mainImageProductPhoto);
        imagenSrc = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
      }
      debugger;
      let currentOrdenDetails = await this.addOrderService.getOrderDetails();
      debugger;
      if (currentOrdenDetails) {
        for (let orderDetail of currentOrdenDetails) {
          if (orderDetail.id_producto == product.id_producto) {
            isInMarket = 1;
            isInMarketText = 'Quitar del carrito';
            break;
          }
        }
      }
      let productToPush = {
        id_producto: product.id_producto, nombre: product.nombre, descripcion: product.descripcion,
        precio: product.precio, stock: product.stock, alto: alto, ancho: ancho, profundidad: profundidad, imagenSrc: imagenSrc,
        isInMarket: isInMarket, isInMarketText: isInMarketText
      }
      finalProductsList.push(productToPush);
    }
    this.products = finalProductsList;
    debugger;
  }

  async selectProductPictures(id_product: number) {
    debugger;
    if (id_product != 0) {
      this.productPicturesSrc = [];
      let imagesResponse = await this.productService.getImagesByProductId(id_product).toPromise();
      let imagesProductList = ((Object.values(imagesResponse))[2]);
      if (imagesProductList.length > 0) {
        debugger;
        for (let i = 0; i < imagesProductList.length; i++) {
          let currentPicture = await this.productService.getImage(id_product, imagesProductList[i].nombre).toPromise();
          let unsafeImageUrl = URL.createObjectURL(currentPicture);
          this.productPicturesSrc[i] = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
        }
        debugger;
        window.location.href = '/#morePicturesModal';
      }
    }
    else {
      window.location.href = '/#morePicturesDesignModal';
    }
  }

  async addToOder(product: any, arrayType: string, i: number) {
    debugger;
    let btnText = document.getElementById(`btn-${product.id_producto}`)!.innerText;
    if (btnText == "Agregar al carrito ") {
      if (this.loginService.getToken() != null) {
        let currentUser = await this.loginService.getCurrentUser(this.loginService.getToken()).toPromise();
        this.currentUser = (Object.values(currentUser))[2];

        if (this.currentUser.idRol != 1) {
          this.addOrderService.addOrderDetail(product);
          debugger;
          document.getElementById(`btn-${product.id_producto}`)!.innerHTML = "Quitar del carrito <img _ngcontent-jdp-c138=\'\' src=\'assets/images/carrito.png\' class=\'iconoCarrito\'>";
          debugger;
          if (arrayType === 'htmlRightProducts') {
            this.htmlRightProducts[i].isInMarket = 1;
          }
          else {
            this.htmlLeftProducts[i].isInMarket = 1;
          }
        } else {
          this.alertsService.errorMessage('Para cargar un pedido deberás hacerlo desde Home Administrador', 'Oops..');
        }
      }
      else {
        this.alertsService.errorMessage('Para comenzar a comprar debes iniciar sesión', 'Oops..');
      }
    } else {
      this.addOrderService.removeOrderDetail(product);
      document.getElementById(`btn-${product.id_producto}`)!.innerHTML = "Agregar al carrito <img _ngcontent-jdp-c138=\'\' src=\'assets/images/carrito.png\' class=\'iconoCarrito\'>";
      if (arrayType === 'htmlRightProducts') {
        this.htmlRightProducts[i].isInMarket = 0;
      }
      else {
        this.htmlLeftProducts[i].isInMarket = 0;
      }
    }

  }

}

