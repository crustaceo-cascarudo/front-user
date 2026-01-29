import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;

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
}
