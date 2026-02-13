import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-payment-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.scss',
})
export class PaymentPage {
  cartService = inject(CartService);
  router = inject(Router);

  // Formulario de pago simplificado
  paymentData = {
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
    fullName: '',
  };

  isLoading = false;

  onSubmit(form: any) {
    if (form.valid && !this.isLoading) {
      this.isLoading = true;

      // Obtener la dirección guardada del checkout
      const deliveryAddress = localStorage.getItem('deliveryAddress') || 'Dirección no especificada';

      const paymentRequest = {
        address: deliveryAddress,
        cardNumber: this.paymentData.cardNumber,
        expiryMonth: this.paymentData.expiryMonth,
        expiryYear: this.paymentData.expiryYear,
        cvc: this.paymentData.cvc,
        fullName: this.paymentData.fullName
      };

      this.cartService.payWithCard(paymentRequest).subscribe({
        next: (response) => {
          // Limpiar la dirección guardada después del pago exitoso
          localStorage.removeItem('deliveryAddress');
          alert('¡Pago realizado con éxito! Tu pedido ha sido confirmado.');
          this.router.navigate(['/menu']);
        },
        error: (error) => {
          console.error('Error en el pago:', error);
          alert('Error en el pago. Por favor, verifica los datos de tu tarjeta.');
          this.isLoading = false;
        }
      });
    }
  }
}
