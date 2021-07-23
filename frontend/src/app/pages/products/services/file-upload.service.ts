import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  sendFile(images: FormData, productId: number, token: any) {
    return this.http.post(`http://localhost:3000/products/upload/${productId}`, images, { headers: new HttpHeaders().set('x-token', `${token}`) })

    //   sendFile(imagen:FormData){
    //     return this.http.post(`${this.rutaApi}/post/upload`, imagen,{})
    //   }

  }

  getFile(productId: number, imgName: string) {
  }
}