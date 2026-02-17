import { CartItemResponse } from "../cart/cart-item-response";

export interface OrderResponse {
    id: number;
    items: CartItemResponse[];
    estado: string;
    address: string;
    orderDate: string;
    totalPrice: number;
    userId: number;
}