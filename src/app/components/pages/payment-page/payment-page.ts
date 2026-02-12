import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardPaymentRequest } from '../../../models/bank-payment/card-payment-request';
import { HttpClientService } from '../../../core/services/http-client-service';
import { CreditCard } from '../../../models/bank-payment/credit-card';
import { CButton } from "../../ui/c-button/c-button";
import { CardPaymentResponse } from '../../../models/bank-payment/card-payment-response';
import { CartItem } from '../../../models/cart/cart-item';

@Component({
  selector: 'app-payment-page',
  imports: [FormsModule, CButton],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.scss',
})
export class PaymentPage {
  http = inject(HttpClientService);

  paymentUrl: string = "/cart/pay"

  paymentRequest: CardPaymentRequest = <CardPaymentRequest>{};
  paymentResponse: CardPaymentResponse = <CardPaymentResponse>{};
  creditCard: CreditCard = <CreditCard>{};

  onSubmit(form: any) {
    if (form.valid) {
      this.paymentRequest.originCreditCard = this.creditCard;
      this.paymentRequest.concept = "Pedido a domicilio en Crustaceo-Cascarudo";
      this.payDelivery(this.paymentRequest);
    }
  }

  payDelivery(cardPaymentrequest: CardPaymentRequest) {
    this.http.postItem<any>(this.paymentUrl, this.paymentRequest).subscribe({
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
