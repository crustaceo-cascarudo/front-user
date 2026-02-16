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
    if (!this.isAlreadyInCart(item.id)) {
      this.cart.next([
        ...this.cart.getValue(), item
      ]);
    }
  }

  removeFromCart(itemId: number) {
    let newCart = this.cart.getValue();

    newCart.splice(
      this.cart.getValue().findIndex((item) => item.id == itemId), 1
    );

    this.cart.next(
      newCart
    );
  }

  clearCart() {
    this.cart.next(
      []
    );
  }

  changeItemQuantity(itemId: number, quantity: number){
    let newCart = this.cart.getValue();

    newCart[
      this.cart.getValue().findIndex((item) => item.id == itemId)
    ].quantity = quantity;

    this.cart.next(
      newCart
    );
  }

  cartTotal(): number {
    return this.cart.getValue().reduce((total, item) => total + item.finalPrice*item.quantity, 0);
  }

  isAlreadyInCart(productId: number) {
    return !(this.cart.getValue().findIndex((item) => item.id == productId) == -1);
  }
}