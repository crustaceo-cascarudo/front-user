import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cart/cart-item';
import { CommonModule } from '@angular/common';
import { CButton } from "../ui/c-button/c-button";
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'cart-element',
  imports: [CommonModule, CButton],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartElement {
  @Input() cartItem!: CartItem;
  @Output() removeFromCart = new EventEmitter<CartItem>();

  cartService = inject(CartService);

  increaseQuantity(){
    this.cartItem.quantity = this.cartItem.quantity + 1;
    this.cartService.changeItemQuantity(this.cartItem.id, this.cartItem.quantity)
  }

  decreaseQuantity(){
    if(this.cartItem.quantity > 1){
      this.cartItem.quantity = this.cartItem.quantity - 1;
      this.cartService.changeItemQuantity(this.cartItem.id, this.cartItem.quantity)
    }else{
      this.removeFromCart.emit(this.cartItem)
    }
  }
}
