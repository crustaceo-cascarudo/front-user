import { Injectable } from "@angular/core";
import { CartItem } from "../../models/cart/cart-item";
import { CartItemResponse } from "../../models/cart/cart-item-response";

@Injectable({
    providedIn: 'root',
})
export class CartItemMapper {
    cartItemResponseToCartItem(itemResponse: CartItemResponse): CartItem {
        let cartItem: CartItem = <CartItem>{};

        cartItem.id = itemResponse.productId;
        cartItem.name = itemResponse.productName;
        cartItem.basePrice = itemResponse.unitPrice;
        cartItem.finalPrice = itemResponse.unitPrice;
        cartItem.image = itemResponse.productImage;
        cartItem.quantity = itemResponse.quantity;

        return cartItem;
    }
}