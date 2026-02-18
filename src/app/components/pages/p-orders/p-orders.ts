import { Component, inject } from '@angular/core';
import { CartElement } from "../../cart-item/cart-item";
import { OrderResponse } from '../../../models/order/orderResponse';
import { HttpClientService } from '../../../core/services/http-client-service';
import { Router } from '@angular/router';
import { CartItemMapper } from '../../../core/mappers/cartItemMapper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'p-orders',
  imports: [CartElement, CommonModule],
  templateUrl: './p-orders.html',
  styleUrl: './p-orders.scss',
})
export class POrders {
  http = inject(HttpClientService);
  router = inject(Router);
  cartItemMapper = inject(CartItemMapper);

  orders: OrderResponse[] = [];


  url: string = "/orders";

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.http.getWithAuth<OrderResponse[]>(this.url + "/user").subscribe({
      next: (data) => {
        this.orders = data;
        console.log(data);
      },
      error: error => {
        this.showError(error);
        //this.router.navigate(['home']);
      }
    });
  }

  private showError(error: Error) {
    console.log(error);
    alert("Ha habido un error, vuelva a intentarlo");
  }
}
