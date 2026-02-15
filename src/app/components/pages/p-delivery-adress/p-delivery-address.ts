import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddressForm } from "../../ui/address-form/address-form";

@Component({
  selector: 'p-delivery-Address',
  imports: [FormsModule, AddressForm],
  templateUrl: './p-delivery-address.html',
  styleUrl: './p-delivery-address.scss',
})
export class PDeliveryAddress {
  redirectRoute: string = '/menu';
}
