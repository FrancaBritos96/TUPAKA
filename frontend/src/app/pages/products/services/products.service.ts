import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Category } from 'src/models/ICategory';
import { INewProducts, NewProduct } from 'src/models/INewProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  constructor(private http: HttpClient) { }

  newProduct(product: NewProduct, token: any): Observable<any> {
    return this.http.post('http://localhost:3000/products/createProduct', product, { headers: new HttpHeaders().set('x-token', `${token}`) })
  };

  getAllProducts(): Observable<any[]> {
    return this.http.get<INewProducts[]>('http://localhost:3000/products/getAllProducts')
  }

  getImagesByProductId(productId: number) {
    return this.http.get<any[]>(`http://localhost:3000/products/getImagesByProductId/${productId}`)
  }

  getImage(productId: number, imgName: string) {
    return this.http.get<any[]>(`http://localhost:3000/products/imagen/${productId}/${imgName}`, { responseType: 'blob' as 'json' });
  }

  deleteProduct(productId: number, token: any): Observable<any> {
    let body = {};
    return this.http.put(`http://localhost:3000/products/deleteProduct/${productId}`, body, { headers: new HttpHeaders().set('x-token', `${token}`) })
  }

  updateProduct(productId: number, newProduct: any, token: any): Observable<any> {
    return this.http.put(`http://localhost:3000/products/updateProduct/${productId}`, newProduct, { headers: new HttpHeaders().set('x-token', `${token}`) })
  }

  getProductsById(token: any, productId: number): Observable<any[]> {
    return this.http.get<INewProducts[]>(`http://localhost:3000/products/getProductById/${productId}`, { headers: new HttpHeaders().set('x-token', `${token}`) })

  }

  getProductsByName(token: any, name: string): Observable<any[]> {
    return this.http.get<INewProducts[]>(`http://localhost:3000/products/getProductByName/${name}`, { headers: new HttpHeaders().set('x-token', `${token}`) })

  }
}
