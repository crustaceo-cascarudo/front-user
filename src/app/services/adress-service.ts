import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Address } from "../models/address";

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    private address = new BehaviorSubject<Address>(<Address>{});
    address$ = this.address.asObservable();

    setAddress(a: Address) {
        console.log("Addres set to");
        console.log(a);
        
        this.address.next(a);
    }

    clearAddress(){
        this.address.next(<Address>{})
    }
}