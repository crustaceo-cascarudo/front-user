import { Injectable } from "@angular/core";
import { Product } from "../../models/menu/product";
import { CartItem } from "../../models/cart/cart-item";

@Injectable({
    providedIn: 'root',
})

export class ProductMapper{
    productToCartItem(product: Product): CartItem{
        let cartItem: CartItem = <CartItem>{};

        cartItem.id = product.id;
        cartItem.name = product.name;
        cartItem.basePrice = product.basePrice;
        cartItem.finalPrice = product.finalPrice;
        cartItem.image = product.image;
        cartItem.quantity = 1;

        return cartItem;
    }
}