import { Routes } from '@angular/router';
import { PHome } from './components/pages/p-home/p-home';
import { PLoginRegister } from './components/pages/p-login-register/p-login-register';
import { PMenu } from './components/pages/p-menu/p-menu';
import { PDeliveryAddress } from './components/pages/p-delivery-adress/p-delivery-address';
import { PaymentPage } from './components/pages/payment-page/payment-page';
import { PCart } from './components/pages/p-cart/p-cart';
import { PCheckout } from './components/pages/p-checkout/p-checkout';
import { paymentGuard } from './core/guards/payment-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PHome },
  { path: 'menu', component: PMenu },
  { path: 'login', component: PLoginRegister },
  // {path: 'deals', component: },
  // {path: 'reservation', component: },
  {path: 'delivery', component: PDeliveryAddress},
  {path: 'cart', component: PCart},
  {path: 'checkout', component: PCheckout},
  //TODO enble this
  //{path: 'payment', component: PaymentPage, canActivate: [paymentGuard]}
  {path: 'payment', component: PaymentPage}
];