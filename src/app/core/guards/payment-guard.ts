import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CartService } from '../../services/cart-service';

export const paymentGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  return cartService.cartTotal() > 0;
};
