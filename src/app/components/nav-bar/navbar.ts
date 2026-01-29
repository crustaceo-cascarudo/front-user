import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CButton } from "../ui/c-button/c-button";
import { MatIcon } from '@angular/material/icon';
import { LoginService } from '../../services/login-service';
import { CartService } from '../../services/cart-service';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavBar {
  loginService = inject(LoginService);
  cartService = inject(CartService);
  cart = this.cartService.getCartItems();
  cartCount = computed(() => this.cartService.cartTotal());
  router = inject(Router);

  isActive(path: string): boolean {
    return this.router.url === path;
  }
  onLogin() {
    this.router.navigate(['/login']);
  }

  showLogOutPanel: boolean = false;

  hoveredReserva: boolean = false;
  hoveredADomicilio: boolean = false;

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}
