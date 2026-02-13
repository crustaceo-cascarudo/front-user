import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, CartResponse, CartItemResponse } from '../models/cart/cart-item';
import { HttpClientService } from '../core/services/http-client-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClientService);

  private cart = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cart.asObservable();

  private cartId: number | null = null;

  loadCart() {
    this.http.getAuth<CartResponse>('/cart').subscribe({
      next: (response) => {
        this.cartId = response.id;
        this.cart.next(this.mapResponseItems(response.items));
      },
      error: () => {
        this.cart.next([]);
      }
    });
  }

  addToCart(productId: number, quantity: number = 1) {
    this.http.postAuth<CartResponse>('/cart/items', { productId, quantity }).subscribe({
      next: (response) => {
        this.cartId = response.id;
        this.cart.next(this.mapResponseItems(response.items));
      },
      error: (err) => console.error('Error adding to cart', err)
    });
  }

  removeFromCart(productId: number, quantity: number = 999) {
    this.http.deleteAuthWithBody<CartResponse>('/cart/items', { productId, quantity }).subscribe({
      next: (response) => {
        this.cart.next(this.mapResponseItems(response.items));
      },
      error: (err) => console.error('Error removing from cart', err)
    });
  }

  changeItemQuantity(productId: number, quantity: number) {
    this.http.putAuth<CartResponse>('/cart/items', { productId, quantity }).subscribe({
      next: (response) => {
        this.cart.next(this.mapResponseItems(response.items));
      },
      error: (err) => console.error('Error updating cart item', err)
    });
  }

  clearCart() {
    this.http.deleteAuth<void>('/cart/clear').subscribe({
      next: () => {
        this.cart.next([]);
      },
      error: (err) => console.error('Error clearing cart', err)
    });
  }

  checkout(address: string) {
    return this.http.postAuth<any>('/cart/checkout', { address });
  }

  payWithCard(paymentData: {
    cardNumber: string,
    expiryMonth: string,
    expiryYear: string,
    cvc: string,
    fullName: string,
    address: string
  }) {
    return this.http.postAuth<any>('/cart/pay', paymentData);
  }

  cartTotal(): number {
    return this.cart.getValue().reduce((total, item) => total + item.subtotal, 0);
  }

  isAlreadyInCart(productId: number): boolean {
    return this.cart.getValue().some(item => item.productId === productId);
  }

  private mapResponseItems(items: CartItemResponse[]): CartItem[] {
    return items.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.productName,
      image: item.productImage,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal
    }));
  }
}