import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from 'src/models/ICategory';
import { NewProduct } from 'src/models/INewProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsListService {

  constructor(private http: HttpClient) { }

  //VER SI ESTA BIEN. 
  
productList(token: any): Observable<any[]> {
    return this.http.get<NewProduct[]>('http://localhost:3000/products/getAllProducts', { headers: new HttpHeaders().set('x-token', `${token}`) })
    
    //   .pipe(catchError(this.errorHandler.handleError))
    //   .pipe(
    //     map((res: any) => {
    //       return res.payload.categoriesFilter;
    //     }));
  }


}