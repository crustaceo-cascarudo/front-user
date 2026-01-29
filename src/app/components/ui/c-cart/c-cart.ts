import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart-service';
import { CartItem } from '../../../models/cart/cart-item';

@Component({
  selector: 'c-cart',
  imports: [],
  templateUrl: './c-cart.html',
  styleUrls: ['./c-cart.scss'],
})
export class CCart {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;

  cartService = inject(CartService);

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.cartTotal();
    });
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }
}
