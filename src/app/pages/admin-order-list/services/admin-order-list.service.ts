import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from 'src/models/ICategory';
import { NewProduct } from 'src/models/INewProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderListService {

  constructor(private http: HttpClient) { }

  //VER SI ESTA BIEN. 
  
getOrderList(token: any): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/orderReports/getAllVentas', { headers: new HttpHeaders().set('x-token', `${token}`) })
    
  }


}