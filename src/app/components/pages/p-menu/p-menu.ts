import { Component, inject } from '@angular/core';
import { ProductCard } from "../../product-card/product-card";
import { Product } from '../../../models/menu/product';
import { Page } from '../../../models/page';
import { HttpClientService } from '../../../core/services/http-client-service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Category } from '../../../models/menu/category';
import { Subscription } from 'rxjs';
import { AddressService } from '../../../services/adress-service';
import { CCart } from "../../ui/c-cart/c-cart";
import { ProductMapper } from '../../../core/mappers/productMapper';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'p-menu',
  imports: [ProductCard, MatPaginator, CCart],
  templateUrl: './p-menu.html',
  styleUrl: './p-menu.scss',
})
export class PMenu {
  http = inject(HttpClientService);
  addressService = inject(AddressService);
  cartService = inject(CartService);
  productMapper = inject(ProductMapper);

  adressSubscription!: Subscription;

  productsUrl: string = "/products/category/";
  categoriesUrl: string = "/categories";

  totalCategories!: number;

  productPageContent!: Page<Product>;
  productPageSize: number = 10;
  categoryPageContent!: Page<Category>;
  products!: Product[];
  categories!: Category[];

  selectedCategory!: Category;

  showCart: boolean = true; //TODO

  ngOnInit() {
    this.getCategoryAmount();
    this.adressSubscription = this.addressService.address$.subscribe({
      next: (address) => {
        if (address.adressLabel != null) {
          this.showCart = true;
        }
      },
      error: error => console.log(error)
    });
  }

  ngOnDestroy(){
    this.adressSubscription.unsubscribe();
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

  addToCart(product: Product) {
    if(this.showCart){
      this.cartService.addToCart(
        this.productMapper.productToCartItem(product)
      );
    }
  }
}