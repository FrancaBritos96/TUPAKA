import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/IUser';
//import { HttpErrorHandlerService } from 'src/utils/httpErrorHandler.service';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class createOrderService {

    constructor(private http: HttpClient) { }

    createOrder(token: any): Observable<any> {
        let body = {};
        return this.http.post('http://localhost:3000/orders/createOrder', body, { headers: new HttpHeaders().set('x-token', `${token}`) });
    }

    createDetailOrder(token: any, orderDetail: any): Observable<any> {
        return this.http.post('http://localhost:3000/orderDetails/createOrderDetail', orderDetail, { headers: new HttpHeaders().set('x-token', `${token}`) });
    }

    payment(token: any, payment: any) {
        return this.http.post('http://localhost:3000/mercadoPago/', payment, { headers: new HttpHeaders().set('x-token', `${token}`) });
    }
}
