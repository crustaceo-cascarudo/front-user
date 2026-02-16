import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginService } from '../../core/services/login-service';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../core/services/auth-service';
import { Subscription } from 'rxjs';
import { CCart } from "../ui/c-cart/c-cart";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CCart],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavBar {
  loginService = inject(LoginService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  cartServiceSubscription! : Subscription;

  cartCount: number = 0;
  showCart: boolean = false;

  ngOnInit(){
    this.cartServiceSubscription = this.cartService.cartItems$.subscribe({
      next: (cartItems) => {
        this.cartCount = cartItems.length
      },
      error: error => console.log(error)  
    });
  }

  ngOnDestroy(){
    this.cartServiceSubscription.unsubscribe();
  }

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
