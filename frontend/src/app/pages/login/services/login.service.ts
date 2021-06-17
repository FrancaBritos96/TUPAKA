import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/IUser';
//import { HttpErrorHandlerService } from 'src/utils/httpErrorHandler.service';
import { catchError } from 'rxjs/operators';



// import { Injectable } from '@angular/core';
// import {HttpClient} from '@angular/common/http'

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

//   constructor(private http:HttpClient) { }

//   login(loginForm:{}){
//     return this.http.post('http://localhost:3000/users/login', loginForm)
//   }
// }

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //constructor(private httpClient?:HttpClient) {}
  constructor(private http:HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users/login', user)
    //.pipe(catchError(this.errorHandler.handleError));
  }

//   resetPassword(email: string): Observable<any> {
//     return this.httpClient.get(`${environment.base_url}${environment.user.base_url}${environment.user.reset}` + '/' + email)
//    // .pipe(catchError(this.errorHandler.handleError));
//   }

//   setUser(user: User): void {
//     let user_string = JSON.stringify(user);
//     localStorage.setItem("currentUser", user_string);
//   }

  setToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

//   setScrollSection(scrollSection: string) {
//     localStorage.setItem("scrollSection", scrollSection);
//   }

//   getScrollSection() {
//     return localStorage.getItem("scrollSection");
//   }

//   deleteScrollSection() {
//     localStorage.removeItem("scrollSection");
//   }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  //TODO
//   getCurrentUser(): User {
//     let user_string = localStorage.getItem("currentUser");
//     if (!(user_string === null || user_string === undefined)) {
//       let user: User = JSON.parse(user_string);
//       return user;
//     } else {
//       return null;
//     }
//   }

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

