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
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users/login', user);
  }

  setToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }


  logout() {
    localStorage.removeItem("accessToken");
  }

  getCurrentUser(token: any) {
    return this.http.get<any>('http://localhost:3000/users', { headers: new HttpHeaders().set('x-token', `${token}`) })
  }
}
