import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart/cart-item';
import { HttpClientService } from '../core/services/http-client-service';
import { AuthService } from '../core/services/auth-service';
import { ProductMapper } from '../core/mappers/productMapper';
import { CartResponse } from '../models/cart/cart-response';
import { CartItemMapper } from '../core/mappers/cartItemMapper';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClientService);
  authService = inject(AuthService);
  productMapper = inject(ProductMapper);
  cartItemMapper = inject(CartItemMapper);

  url: string = "/cart";

  private cart = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cart.asObservable();

  loadActiveCart(): boolean {
    let newCart: CartItem[] = [];

    this.http.getWithAuth<CartResponse>(this.url).subscribe({
      next: (data) => {
        data.items.forEach(
          (item) => {
            newCart.push(this.cartItemMapper.cartItemResponseToCartItem(item));
          }
        );

        this.cart.next(newCart);
        return true;
      },
      error: error => {
        if(error.status == 404){
          return true;
        } 
        return false;
      }
    });

    return false;
  }

  clearCart() {
    this.http.deleteWithAuth(this.url + "/clear").subscribe({
      next: () => {
        this.clearCartLocally();
      },
      error: error => this.showError(error)
    });
  }

  clearCartLocally() {
    let emptyCart: CartItem[] = [];
    this.cart.next(
      emptyCart
    );    
  }

  addToCart(item: CartItem, quantity: number = 1) {
    if (this.isAlreadyInCart(item.id)) {
      this.changeItemQuantity(item.id, this.getItemQuantity(item.id) + quantity);
    } else {
      this.http.postWithAuth(this.url + "/items", { productId: item.id, quantity: quantity }).subscribe({
        next: () => {
          this.cart.next([
            ...this.cart.getValue(), item
          ]);
        },
        error: error => this.showError(error)
      });
    }
  }

  removeFromCart(itemId: number) {
    let newCart = this.cart.getValue();
    let index = newCart.findIndex((item) => item.id == itemId);

    newCart.splice(
      index, 1
    );

    this.http.deleteWithAuthAndBody(this.url + "/items", { productId: itemId }).subscribe({
      next: () => {
        this.cart.next(
          newCart
        );
      },
      error: error => this.showError(error)
    });
  }

  getItemQuantity(id: number): number {
    return this.cart.getValue().find((item) => item.id == id)?.quantity ?? 0;
  }


  changeItemQuantity(itemId: number, quantity: number): boolean {
    let newCart = this.cart.getValue();

    newCart[this.cart.getValue().findIndex((item) => item.id == itemId)]
      .quantity = quantity;

    this.http.putWithAuth(this.url + "/items", { productId: itemId, quantity: quantity }).subscribe({
      next: () => {
        this.cart.next(
          newCart
        );
        return true;
      },
      error: error => {
        this.showError(error);
        return false;
      }
    });

    return false;
  }

  cartTotal(): number {
    return this.cart.getValue().reduce((total, item) => total + item.finalPrice * item.quantity, 0);
  }

  isAlreadyInCart(productId: number) {
    return !(this.cart.getValue().findIndex((item) => item.id == productId) == -1);
  }

  private showError(error: Error) {
    console.log(error);
    alert("Ha habido un error, vuelva a intentarlo");
  }
}