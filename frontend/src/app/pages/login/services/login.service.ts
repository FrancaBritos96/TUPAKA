import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.post('http://localhost:3000/users/login', user)

  }

  setToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }


  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("accounts");
    localStorage.removeItem("RequestIdSelection");
    localStorage.removeItem("isProffessional");
    localStorage.removeItem("isProffessionalRol");
    localStorage.removeItem("isAdminRol");
    localStorage.removeItem("RequestResponseIdSelection")
  }
}

