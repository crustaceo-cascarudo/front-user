import { Product } from "../menu/product"

export interface OrderItemResponse {
    id: number,
    productDto: Product
    quantity: number,
    itemPrice: number
}