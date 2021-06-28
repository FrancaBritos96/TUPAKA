import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from 'src/models/ICategory';
import { NewProduct } from 'src/models/INewProduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  newCategory(cateogry: Category): Observable<any> {
    return this.http.post('http://localhost:3000/categories/createCat', cateogry)
}

getCategories(token: any): Observable<any[]> {
    return this.http.get<Category[]>('http://localhost:3000/categories/getAllCategories', { headers: new HttpHeaders().set('x-token', `${token}`) });
    
  }

  getCategoryById(token: any, categoryId: number): Observable<any> {
    debugger;
    debugger;
    return this.http.get<any>(`http://localhost:3000/categories/getCategoryById/${categoryId}`, { headers: new HttpHeaders().set('x-token', `${token}`) });
    debugger;
  }


}