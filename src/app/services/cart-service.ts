import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart/cart-item';
import { HttpClientService } from '../core/services/http-client-service';
import { AuthService } from '../core/services/auth-service';
import { ProductMapper } from '../core/mappers/productMapper';
import { Product } from '../models/menu/product';
import { T } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClientService);
  authService = inject(AuthService);
  productMapper = inject(ProductMapper);

  url: string = "/cart";

  private cart = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cart.asObservable();

  getActiveCart() {
    const userId = this.authService.getUserId();
    if(userId != undefined) {
      let newCart: CartItem[] = [];

      this.http.getById<any>(this.url, userId.valueOf()).subscribe({
        next: (data) => {
          data.products.forEach(
            (product: { productDto: Product; quantity: number; }) => {
              let mappedItem: CartItem = <CartItem>{};
              mappedItem = this.productMapper.productToCartItem(product.productDto);
              mappedItem.quantity = product.quantity

              newCart.push(mappedItem);
            }
          )
        },
      });
    }
  }

  createCart() {
    const userId = this.authService.getUserId();
    if (userId != undefined) {
      this.http.postItem(this.url, userId.valueOf()).subscribe({
        error: error => {
          console.log(error);
        }
      })
    }
  }

  clearCart() {
    this.cart.next(
      []
    );
  }

  addToCart(item: CartItem) {
    if (!this.isAlreadyInCart(item.id)) {
      this.http.postItem(this.url+"/items", item.id).subscribe({
        next: () => {
          this.cart.next([
            ...this.cart.getValue(), item
          ]);
        },
        error: error => {
          console.log(error);
          alert("Ha habido un error, vuelva a intentarlo")
        }
      });
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