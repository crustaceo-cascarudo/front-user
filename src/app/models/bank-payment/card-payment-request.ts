import { CreditCard } from "./credit-card";

export interface CardPaymentRequest {
    apiToken: string;
    originCreditCard: CreditCard;
    concept: string;
}