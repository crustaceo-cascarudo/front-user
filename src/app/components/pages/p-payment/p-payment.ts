import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardPaymentRequest } from '../../../models/bank-payment/card-payment-request';
import { HttpClientService } from '../../../core/services/http-client-service';
import { CreditCard } from '../../../models/bank-payment/credit-card';
import { CButton } from "../../ui/c-button/c-button";
import { CardPaymentResponse } from '../../../models/bank-payment/card-payment-response';
import { CartItem } from '../../../models/cart/cart-item';
import { CommonModule } from '@angular/common';
import { CartElement } from '../../cart-item/cart-item';
import { CartService } from '../../../services/cart-service';
import { CAddressForm } from "../../ui/c-address-form/c-address-form";
import { AddressService } from '../../../services/adress-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  imports: [FormsModule, CButton, CommonModule, CartElement, CAddressForm],
  templateUrl: './p-payment.html',
  styleUrl: './p-payment.scss',
})
export class PPayment {
  http = inject(HttpClientService);
  cartService = inject(CartService);
  addressService = inject(AddressService);
  router = inject(Router);

  paymentUrl: string = "/cart/pay"

  cart!: CartItem[];

  paymentRequest: CardPaymentRequest = <CardPaymentRequest>{};
  paymentResponse: CardPaymentResponse = <CardPaymentResponse>{};
  creditCard: CreditCard = <CreditCard>{};


  ngOnInit(){
    this.cartService.cartItems$.subscribe({
      next: (items) => {
        this.cart = items;
      }
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.paymentRequest.cardNumber = this.creditCard.cardNumber;
      this.paymentRequest.expiryMonth = this.creditCard.expiryMonth;
      this.paymentRequest.expiryYear = "20"+this.creditCard.expiryYear;
      this.paymentRequest.cvc = this.creditCard.cvc;
      this.paymentRequest.fullName = this.creditCard.fullName;
      this.paymentRequest.accountIban = this.creditCard.accountIban;
      this.paymentRequest.address = this.addressService.getAddress().addressAsString;
      this.payDelivery();
    }
  }

  payDelivery() {
    this.http.postWithAuth<any>(this.paymentUrl, this.paymentRequest).subscribe({
      next: () => {
        this.cartService.clearCartLocally();
        alert("Pago realizado con éxito. Gracias por su compra en Crustaceo-Cascarudo");
        this.router.navigate(['/home']);
      },
      error: (error) => {
        alert("Error en los datos de la tarjeta. No se ha producido el pago");
        console.log(error);
      }
    });
  }
}
