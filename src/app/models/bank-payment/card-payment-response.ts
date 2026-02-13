import { CartItem } from "../cart/cart-item";

export interface CardPaymentResponse {
    orderId: number;
    state: string;
    address: string;
    orderDate: Date;
    orderItems: CartItem[];
    totalItems: number;
    totalPrice: number;
    message: string;
}