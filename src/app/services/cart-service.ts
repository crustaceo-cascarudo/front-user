import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cart.asObservable();

  addToCart(item: CartItem) {

  }

  removeFromCart(itemId: number) {
  }

  clearCart() {
  }

  getCartItems(): CartItem[] {
    return this.cart.getValue();
  }

  cartTotal(): number {
    return this.getCartItems().reduce((total, item) => total + item.finalPrice, 0);
  }
}