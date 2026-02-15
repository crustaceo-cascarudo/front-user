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
import { AddressForm } from "../../ui/address-form/address-form";

@Component({
  selector: 'app-payment-page',
  imports: [FormsModule, CButton, CommonModule, CartElement, AddressForm],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.scss',
})
export class PaymentPage {
  http = inject(HttpClientService);
  cartService = inject(CartService);

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
      this.paymentRequest.originCreditCard = this.creditCard;
      this.paymentRequest.concept = "Pedido a domicilio en Crustaceo-Cascarudo";
      this.payDelivery();
    }
  }

  payDelivery() {
    this.http.postWithAuth<any>(this.paymentUrl, this.paymentRequest).subscribe({
      next: (response) => {
        this.paymentResponse = response;
        this.paymentResponse.state = response.estado;
        this.paymentResponse.orderItems = [];

        response.items.forEach(
          (element: { name: string; image: string; quantity: number; unitPrice: number; }) => {
            let mappedItem: CartItem = <CartItem>{};

            mappedItem.name = element.name;
            mappedItem.image = element.image;
            mappedItem.quantity = element.quantity;
            mappedItem.finalPrice = element.unitPrice;

            this.paymentResponse.orderItems.push(mappedItem);
          }
        );
      },
      error: () => alert("Error en los datos de la tarjeta. No se ha producido el pago")
    });
  }
}
