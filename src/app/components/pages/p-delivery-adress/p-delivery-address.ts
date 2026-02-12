import { Component, inject } from '@angular/core';
import Radar from 'radar-sdk-js';
import { CButton } from "../../ui/c-button/c-button";
import { AddressService } from '../../../services/adress-service';
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { Address } from '../../../models/address';
import AutocompleteUI from 'radar-sdk-js/dist/ui/autocomplete';
import { NgClass } from '@angular/common';
import { AddressMapper } from '../../../core/mappers/addressMapper';
import { AddressForm } from "../../ui/address-form/address-form";

@Component({
  selector: 'p-delivery-Address',
  imports: [CButton, FormsModule, NgClass, AddressForm],
  templateUrl: './p-delivery-address.html',
  styleUrl: './p-delivery-address.scss',
})
export class PDeliveryAddress {
  redirectRoute: string = '/menu';
}
