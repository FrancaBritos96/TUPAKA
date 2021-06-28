import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  sendFile(imagen:FormData){
    return this.http.post('http://localhost:3000/products/upload/:productId', imagen,{})

//   sendFile(imagen:FormData){
//     return this.http.post(`${this.rutaApi}/post/upload`, imagen,{})
//   }

}
}