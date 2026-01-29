import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CButton } from "../ui/c-button/c-button";
import { MatIcon } from '@angular/material/icon';
import { LoginService } from '../../services/login-service';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../services/auth-service';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavBar {
  loginService = inject(LoginService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  cart = this.cartService.getCartItems();
  cartCount = computed(() => this.cartService.cartTotal());
  router = inject(Router);

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  showLogOutPanel: boolean = false;

  hoveredReserva: boolean = false;
  hoveredADomicilio: boolean = false;

  onLogin() {
    if (this.authService.isLoggedIn()) {
      this.showLogOutPanel = !this.showLogOutPanel;
    } else {
      this.router.navigate(['/login']);
    }
  }

  logOut() {
    this.authService.logout().subscribe({
      next: () => {
        this.showLogOutPanel = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.authService.removeToken();
        this.showLogOutPanel = false;
        this.router.navigate(['/login']);
      }
    });
  }
}
