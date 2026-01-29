import { Component, inject } from '@angular/core';
import { ProductCard } from "../../product-card/product-card";
import { Product } from '../../../models/product';
import { Page } from '../../../models/page';
import { HttpClientService } from '../../../services/http-client-service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Category } from '../../../models/category';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-p-menu',
  imports: [ProductCard, MatPaginator],
  templateUrl: './p-menu.html',
  styleUrl: './p-menu.scss',
})
export class PMenu {
  http = inject(HttpClientService);

  productsUrl: string = "/products/category/";
  categoriesUrl: string = "/categories";

  totalCategories!: number;

  productPageContent!: Page<Product>;
  productPageSize: number = 10;
  categoryPageContent!: Page<Category>;
  products!: Product[];
  categories!: Category[];

  selectedCategory!: Category;

  ngOnInit() {
    this.getCategoryAmount();
  }

  getCategoryAmount() {
    this.http.getPage(this.categoriesUrl, 1, 1).subscribe({
      next: (page) => { 
        this.totalCategories = page.totalElements;
        this.getData();
      },
      error: (error) => console.log('ERROR ' + error.status),
    })
  }

  getData() {
    this.http.getPage(this.categoriesUrl, 1, this.totalCategories).subscribe({
      next: (page) => {
        this.categoryPageContent = page as unknown as Page<Category>;
        this.categories = this.categoryPageContent?.data;
        this.selectedCategory = this.categories[0];

        this.getProductsBySelectedCategory();
      },
      error: (error) => console.log('ERROR ' + error.status),
    })
  }

  getProductsBySelectedCategory(pageIndex: number = 1, pageSize: number = this.productPageSize) {
    this.http.getPage(this.productsUrl + this.selectedCategory.slug, pageIndex, pageSize).subscribe({
      next: (page) => {
        this.productPageContent = page as unknown as Page<Product>;
        this.products = this.productPageContent?.data;
      },
      error: (error) => console.log('ERROR ' + error.status),
    })
  }

  handlePageEvent(event: PageEvent) {
    this.getProductsBySelectedCategory(event.pageIndex + 1, event.pageSize);
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.getProductsBySelectedCategory();
  }
}