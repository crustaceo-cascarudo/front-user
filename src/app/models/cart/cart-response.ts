import { CartItemResponse } from "./cart-item-response";

export interface CartResponse {
    id: number,
    userId: number,
    items: CartItemResponse[],
    totalItems: number,
    totalPrice: number
}