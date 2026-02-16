import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../../services/cart-service';

export const paymentGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);
  if (cartService.cartTotal() > 0) {
    return true;
  } else {
    router.navigate(['/delivery']);
    return false;
  }
};
