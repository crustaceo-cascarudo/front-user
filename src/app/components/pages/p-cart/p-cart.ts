import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cart-service';
import { CartItem } from '../../../models/cart/cart-item';

@Component({
  selector: 'app-p-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './p-cart.html',
  styleUrls: ['./p-cart.scss'],
})
export class PCart implements OnInit, OnDestroy {
  cartService = inject(CartService);
  router = inject(Router);

  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  private cartSubscription!: Subscription;

  ngOnInit() {
    this.cartService.loadCart();
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.cartTotal();
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  get subtotal(): number {
    return this.cartTotal;
  }

  get taxes(): number {
    return 0;
  }

  get shipping(): number {
    return this.cartTotal > 0 ? 2.99 : 0;
  }

  get total(): number {
    return this.subtotal + this.shipping;
  }

  increaseQuantity(item: CartItem) {
    this.cartService.changeItemQuantity(item.productId, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.changeItemQuantity(item.productId, item.quantity - 1);
    } else {
      this.cartService.removeFromCart(item.productId);
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
