import { Component, Input, inject } from '@angular/core';
import { Product } from '../../models/menu/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;
  @Input() clickable: boolean = false;
  @Input() showButton: boolean = false;

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
    this.cartService.addToCart(this.product.id, 1);
  }
}
