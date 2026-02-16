import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginService } from '../../core/services/login-service';
import { CartService } from '../../services/cart-service';
import { AuthService } from '../../core/services/auth-service';
import { Subscription } from 'rxjs';
import { AddressService } from '../../services/adress-service';
import { CCart } from "../ui/c-cart/c-cart";
import { CButton } from "../ui/c-button/c-button";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CCart, CButton],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavBar {
  loginService = inject(LoginService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  addressService = inject(AddressService);
  router = inject(Router);

  cartServiceSubscription! : Subscription;
  addressServiceSubscription! : Subscription;

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
    this.addressServiceSubscription.unsubscribe();
    this.cartServiceSubscription.unsubscribe();
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  isCartActive(): boolean {
    let activateCart: boolean = false;

    this.addressServiceSubscription = this.addressService.address$.subscribe({
      next: (address) => {
        if (address.adressLabel != null && this.router.url != '/menu' && this.router.url != '/payment') {
          activateCart = true;
        }else{
          activateCart = false;
          this.showCart = false;
        }
      },
      error: () => {
        activateCart = false;
        this.showCart = false;
      }
    });

    return activateCart;
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
    this.cartService.clearCartLocally();
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
