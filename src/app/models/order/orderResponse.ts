import { CartItemResponse } from "../cart/cart-item-response";

export interface OrderResponse {
    id: number;
    products: CartItemResponse[];
    estado: string;
    address: string;
    orderDate: string;
    totalPrice: number;
    userId: number;
}