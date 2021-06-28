import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Size } from 'src/models/iSizes';
import { NewProduct } from 'src/models/INewProduct';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SizeService {

    constructor(private http: HttpClient) { }

    newSize(size: Size): Observable<any> {
        return this.http.post('http://localhost:3000/sizes/createSizes', size)
    }

    getSize(token: any): Observable<any[]> {
        return this.http.get<Size[]>('http://localhost:3000/sizes/getAllSizes', { headers: new HttpHeaders().set('x-token', `${token}`) })

    }

    getSizeById(token: any, sizeId: number): Observable<any> {
        debugger;
        debugger;
        return this.http.get<any>(`http://localhost:3000/sizes/getSizeById/${sizeId}`, { headers: new HttpHeaders().set('x-token', `${token}`) });
        debugger;
      }
}