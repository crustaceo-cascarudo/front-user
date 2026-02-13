export interface CartItem {
    id: number,
    productId: number,
    name: string,
    image: string,
    quantity: number,
    unitPrice: number,
    subtotal: number
}

export interface CartResponse {
    id: number,
    userId: number,
    items: CartItemResponse[],
    totalItems: number,
    totalPrice: number
}

export interface CartItemResponse {
    id: number,
    productId: number,
    productName: string,
    productImage: string,
    quantity: number,
    unitPrice: number,
    subtotal: number
}
