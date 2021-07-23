import { EventEmitter, Injectable, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AddOrderService {

  @Output()
  orderEmitter = new EventEmitter<any>();


  constructor() {
  }

  async addOrderDetail(newOrderDetail: any) {
    if (localStorage.getItem("orderDetails")) {
      let currentOrderDetails: any[] = await this.getOrderDetails();
      currentOrderDetails.push(newOrderDetail);
      let orderDetailsString = JSON.stringify(currentOrderDetails);
      localStorage.setItem("orderDetails", orderDetailsString);
    }
    else {
      let currentOrderDetails: any[] = [];
      currentOrderDetails.push(newOrderDetail);
      let orderDetailsString = JSON.stringify(currentOrderDetails);
      localStorage.setItem("orderDetails", orderDetailsString);
    }
  }

  async removeOrderDetail(newOrderDetail: any) {
    let currentOrderDetails: any[] = await this.getOrderDetails();
    for (let ordetDetail of currentOrderDetails) {
      if (ordetDetail.id_producto == newOrderDetail.id_producto) {
        currentOrderDetails = currentOrderDetails.filter(obj => obj !== ordetDetail);
      }
    }
    let orderDetailsString = JSON.stringify(currentOrderDetails);
    localStorage.setItem("orderDetails", orderDetailsString);
  }

  async getOrderDetails(): Promise<any[]> {
    let orderDetailsString = localStorage.getItem("orderDetails")!;
    return JSON.parse(orderDetailsString);
  }
}