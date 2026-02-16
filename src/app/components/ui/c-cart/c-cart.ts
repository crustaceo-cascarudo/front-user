import { Component, inject, Input, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service';
import { CartItem } from '../../../models/cart/cart-item';
import { CButton } from "../c-button/c-button";
import { CartElement } from "../../cart-item/cart-item";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'c-cart',
  imports: [CButton, CartElement, CommonModule],
  templateUrl: './c-cart.html',
  styleUrls: ['./c-cart.scss'],
})
export class CCart {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  cartService = inject(CartService);
  cartServiceSubscription!: Subscription;

  ngOnInit() {
    this.cartServiceSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.cartTotal();
    });
  }

  ngOnDestroy() {
    this.cartServiceSubscription.unsubscribe();
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  makePayment() {
    //TODO -> process payment method
  }
}
