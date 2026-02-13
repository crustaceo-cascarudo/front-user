import { Injectable } from "@angular/core";
import { Product } from "../../models/menu/product";
import { CartItem } from "../../models/cart/cart-item";

@Injectable({
    providedIn: 'root',
})

export class ProductMapper{
    productToCartItem(product: Product): CartItem{
        let cartItem: CartItem = <CartItem>{};

        cartItem.productId = product.id;
        cartItem.name = product.name;
        cartItem.unitPrice = product.finalPrice;
        cartItem.subtotal = product.finalPrice;
        cartItem.image = product.image;
        cartItem.quantity = 1;

        return cartItem;
    }
}