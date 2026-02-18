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
  @Input() isOrderItem: boolean = false;
  @Output() removeFromCart = new EventEmitter<CartItem>();

  showButtons!: boolean;

  ngOnInit() {
    this.showButtons = !this.isOrderItem;
  }

  cartService = inject(CartService);

  increaseQuantity(){
    if(this.cartService.changeItemQuantity(this.cartItem.id, this.cartItem.quantity+1)){
      this.cartItem.quantity = this.cartItem.quantity + 1;
    }
  }

  decreaseQuantity(){
    if(this.cartItem.quantity > 1){
      if(this.cartService.changeItemQuantity(this.cartItem.id, this.cartItem.quantity - 1)){
        this.cartItem.quantity = this.cartItem.quantity - 1;
      }
    }else{
      this.removeFromCart.emit(this.cartItem)
    }
  }
}
