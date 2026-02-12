import { Component, inject, Input } from '@angular/core';
import Radar from 'radar-sdk-js';
import { CButton } from "../../ui/c-button/c-button";
import { AddressService } from '../../../services/adress-service';
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { Address } from '../../../models/address';
import AutocompleteUI from 'radar-sdk-js/dist/ui/autocomplete';
import { NgClass } from '@angular/common';
import { AddressMapper } from '../../../core/mappers/addressMapper';

@Component({
  selector: 'address-form',
  imports: [CButton, FormsModule, NgClass],
  templateUrl: './address-form.html',
  styleUrl: './address-form.scss',
})
export class AddressForm {
  @Input() redirectRoute: string = "";

  private addresService = inject(AddressService);
  private addressMapper = inject(AddressMapper);
  private router = inject(Router);

  doorNumber: string = "";

  isButtonDisbled: boolean = true;
  isDoorEnabled: boolean = false;
  isAddressOk: boolean = true;

  addressAutocomplete!: AutocompleteUI;
  finalAddress: Address = <Address>{};

  ngOnInit() {
    Radar.initialize('prj_live_pk_48ee2fde89db27b2c0bb08903122e1cb99d7a456');

    this.addressAutocomplete = Radar.ui.autocomplete({
      container: 'autocomplete',
      showMarkers: true,
      markerColor: '#8D222C',
      responsive: true,
      width: '600px',
      maxHeight: '600px',
      placeholder: 'Search address',
      limit: 8,
      minCharacters: 3,
      onSelection: (address) => {
        this.finalAddress = this.addressMapper.radarAddressToAddress(address);
        this.isDoorEnabled = true;
        this.checkAddress();
      },
      onResults: () => {
        this.isButtonDisbled = true;
        this.isAddressOk = false;
      }
    });

    console.log("Route: " + this.redirectRoute);
    console.log("isButtonDisabled: " + this.isButtonDisbled);
    console.log("isAddressOk: " + this.isAddressOk);

    this.addresService.address$.subscribe({
      next: (address) => {
        if(address.adressLabel != undefined){
          this.addressAutocomplete.inputField.value = address.adressLabel+" "+address.doorNumber+", "+address.city+", "+address.state+", "+address.country;
          if(address.doorNumber != ""){
            this.isDoorEnabled = true
            this.doorNumber = address.doorNumber;
          }
          this.addressAutocomplete.setDisabled(true);
        }
      }
    });
  }

  mountFinalAddress() {
    this.finalAddress.doorNumber = this.doorNumber;
    this.addresService.setAddress(this.finalAddress);

    this.checkAddress();

    console.log("Route: " +this.redirectRoute);
    console.log("isButtonDisabled: "+this.isButtonDisbled);
    console.log("isAddressOk: "+this.isAddressOk);
    

    if (!this.isButtonDisbled && this.isAddressOk && this.redirectRoute != "") {
      console.log("TEJODESSSS");
      
      this.router.navigate([this.redirectRoute]);
    }
  }

  checkAddress() {
    if (this.finalAddress.adressLabel != "" && this.finalAddress.adressLabel != undefined &&
          this.finalAddress.houseNumber != undefined && this.finalAddress.houseNumber != "") {
      this.isButtonDisbled = false;
      this.addressAutocomplete.setDisabled(true);
      this.isAddressOk = true;   
    } else {
      this.isAddressOk = false;
      this.addressAutocomplete.setDisabled(false);
      this.isButtonDisbled = true;
    }
  }

  cleanAddress() {
    this.finalAddress = <Address>{};
    this.addresService.clearAddress;
    this.addressAutocomplete.setDisabled(false);
    this.addressAutocomplete.inputField.value = "";
    this.isButtonDisbled = true;
  }
}
