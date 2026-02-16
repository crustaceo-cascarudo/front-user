import { Component, Input, inject } from '@angular/core';
import { Product } from '../../models/menu/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../models/cart/cart-item';

@Component({
  selector: 'product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;
  @Input() clickable: boolean = false;

  cartService = inject(CartService);

  ingredientList: string[] = [];
  ingredients: string = "";
  
  ngOnChanges(){
    this.ingredientList = [];
    this.ingredients = "";
    this.setUpData();
  }

  setUpData(){
    this.product.ingredients.forEach(element => {
      this.ingredientList.push(element.name);
      this.ingredientList.push(", ")
    });

    this.ingredientList.pop();

    this.ingredientList.forEach(element => {
      this.ingredients = "" + this.ingredients + element;
    });
  }

  addToCart() {
    // Convertir Product a CartItem
    const cartItem: CartItem = {
      id: this.product.id,
      name: this.product.name,
      basePrice: this.product.basePrice,
      finalPrice: this.product.finalPrice,
      image: this.product.image,
      quantity: 1
    };
    
    this.cartService.addToCart(cartItem);
  }
}
