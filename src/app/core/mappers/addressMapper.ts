import { Injectable } from "@angular/core";
import { Address } from "../../models/address";

@Injectable({
    providedIn: 'root',
})
export class AddressMapper{
    radarAddressToAddress(address: any): Address{
        let finalAddresss: Address = <Address>{};

        finalAddresss.adressLabel = address.addressLabel;
        finalAddresss.country = address.country;
        finalAddresss.countryCode = address.countryCode;
        finalAddresss.state = address.state;
        finalAddresss.county = address.county;
        finalAddresss.city = address.city;
        finalAddresss.street = address.street;
        finalAddresss.houseNumber = address.number;
        finalAddresss.postalCode = address.postalCode;

        return finalAddresss;
    }
}