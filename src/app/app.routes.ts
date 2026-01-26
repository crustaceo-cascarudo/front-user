import { Routes } from '@angular/router';
import { PHome } from './components/pages/p-home/p-home';
import { PLoginRegister } from './components/pages/p-login-register/p-login-register';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PHome },
  { path: 'login', component: PLoginRegister },
  // {path: 'menu', component: },
  // {path: 'deals', component: },
  // {path: 'reservation', component: },
  // {path: 'delivery', component: }
];
