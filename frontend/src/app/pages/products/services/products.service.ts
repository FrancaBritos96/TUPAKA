import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from 'src/models/ICategory';
import { INewProducts, NewProduct } from 'src/models/INewProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewProductService {

  constructor(private http: HttpClient) { }

  newProduct(product: NewProduct, token: any): Observable<any> {
    debugger;
    return this.http.post('http://localhost:3000/products/createProduct', product, { headers: new HttpHeaders().set('x-token', `${token}`) })
  };

  getAllProducts(token: any): Observable<any[]> {
    debugger;
    return this.http.get<INewProducts[]>('http://localhost:3000/products/getAllProducts', { headers: new HttpHeaders().set('x-token', `${token}`) })
    debugger;

  }
}
