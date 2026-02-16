import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CAddressForm } from "../../ui/c-address-form/c-address-form";

@Component({
  selector: 'p-delivery-Address',
  imports: [FormsModule, CAddressForm],
  templateUrl: './p-delivery-address.html',
  styleUrl: './p-delivery-address.scss',
})
export class PDeliveryAddress {
  redirectRoute: string = '/menu';
}
