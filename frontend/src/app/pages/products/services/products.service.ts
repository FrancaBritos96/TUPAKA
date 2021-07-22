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

  getAllProducts(): Observable<any[]> {
    debugger;
    return this.http.get<INewProducts[]>('http://localhost:3000/products/getAllProducts')
    debugger;

  }

  getImagesByProductId(productId: number){
    debugger;
    return this.http.get<any[]>(`http://localhost:3000/products/getImagesByProductId/${productId}`)
    debugger;
  }

  getImage(productId: number, imgName: string){
    debugger;
    return this.http.get<any[]>(`http://localhost:3000/products/imagen/${productId}/${imgName}`, { responseType: 'blob' as 'json'});
    debugger;
  }
}
