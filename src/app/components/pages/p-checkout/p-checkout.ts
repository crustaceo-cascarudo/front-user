import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../../services/cart-service';
import { CartItem } from '../../../models/cart/cart-item';

interface DeliveryForm {
  nombre: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  instrucciones: string;
}

@Component({
  selector: 'app-p-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './p-checkout.html',
  styleUrls: ['./p-checkout.scss'],
})
export class PCheckout implements OnInit, OnDestroy {
  cartService = inject(CartService);
  router = inject(Router);

  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  private cartSubscription!: Subscription;

  deliveryForm: DeliveryForm = {
    nombre: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    instrucciones: '',
  };

  paymentMethod: string = 'tarjeta';

  ngOnInit() {
    this.cartService.loadCart();
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.cartTotal = this.cartService.cartTotal();
    });

    if (this.cartItems.length === 0) {
      this.router.navigate(['/menu']);
    }
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

  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
  }

  onSubmit(form: any) {
    if (form.valid) {
      const fullAddress = `${this.deliveryForm.direccion}, ${this.deliveryForm.ciudad}, ${this.deliveryForm.codigoPostal}`;

      // Guardar la dirección para usarla en el pago
      localStorage.setItem('deliveryAddress', fullAddress);

      // Ir directamente al pago con tarjeta (la API solo necesita /cart/pay)
      this.router.navigate(['/payment']);
    }
  }
}
