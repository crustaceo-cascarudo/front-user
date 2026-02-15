import { CreditCard } from "./credit-card";

export interface CardPaymentRequest {
    cardNumber: number;
    expiryMonth: string;
    expiryYear: string;
    cvc: number;
    fullName: string;
    accountIban: number;
    address: string;
}