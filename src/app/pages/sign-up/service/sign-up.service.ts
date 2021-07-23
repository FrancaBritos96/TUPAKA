import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  rutaApi:string = "http://localhost:3000" 

  createUser(createUserForm:{}) { 
    return this.http.post<any>(`${this.rutaApi}/users/createUser`, createUserForm);
  }
}
