import { Component, inject } from '@angular/core';
import { ProductCard } from '../../product-card/product-card';
import { Product } from '../../../models/menu/product';
import { Page } from '../../../models/page';
import { HttpClientService } from '../../../core/services/http-client-service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Category } from '../../../models/menu/category';
import { Subscription } from 'rxjs';
import { AddressService } from '../../../services/adress-service';
import { CCart } from '../../ui/c-cart/c-cart';
import { CartService } from '../../../services/cart-service';
import { FormsModule } from '@angular/forms';
import { Ingredient } from '../../../models/menu/ingredient';

@Component({
  selector: 'p-menu',
  imports: [ProductCard, MatPaginator, FormsModule],
  templateUrl: './p-menu.html',
  styleUrl: './p-menu.scss',
})
export class PMenu {
  http = inject(HttpClientService);
  addressService = inject(AddressService);
  cartService = inject(CartService);

  adressSubscription!: Subscription;

  productsUrl: string = '/products/category/';
  categoriesUrl: string = '/categories';

  totalCategories!: number;

  productPageContent!: Page<Product>;
  productPageSize: number = 9;
  categoryPageContent!: Page<Category>;
  products!: Product[];
  categories!: Category[];

  selectedCategory!: Category;

  showCart: boolean = false;

  searchQuery: string = '';
  isFilterOpen: boolean = false;
  isMobileSidebarOpen: boolean = false;
  selectedIngredients: Ingredient[] = [];
  allIngredients: Ingredient[] = [];
  filteredProducts: Product[] = [];
  isAllCategoriesSelected: boolean = false;

  ngOnInit() {
    this.getCategoryAmount();
    this.adressSubscription = this.addressService.address$.subscribe({
      next: (address) => {
        if (address.adressLabel != null) {
          this.showCart = true;
          this.cartService.loadCart();
        }
      },
      error: (error) => console.log(error),
    });
  }

  ngOnDestroy() {
    this.adressSubscription.unsubscribe();
  }

  getCategoryAmount() {
    this.http.getPage(this.categoriesUrl, 1, 1).subscribe({
      next: (page) => {
        this.totalCategories = page.totalElements;
        this.getData();
      },
      error: (error) => console.log('ERROR ' + error.status),
    });
  }

  getData() {
    this.http.getPage(this.categoriesUrl, 1, this.totalCategories).subscribe({
      next: (page) => {
        this.categoryPageContent = page as unknown as Page<Category>;
        this.categories = this.categoryPageContent?.data;
        this.selectedCategory = this.categories[0];
        this.isAllCategoriesSelected = true;

        this.getAllProducts();
      },
      error: (error) => console.log('ERROR ' + error.status),
    });
  }

  getProductsBySelectedCategory(pageIndex: number = 1, pageSize: number = this.productPageSize) {
    this.http
      .getPage(this.productsUrl + this.selectedCategory.slug, pageIndex, pageSize)
      .subscribe({
        next: (page) => {
          this.productPageContent = page as unknown as Page<Product>;
          this.products = this.productPageContent?.data;
          this.extractAllIngredients();
          this.filterProducts();
        },
        error: (error) => console.log('ERROR ' + error.status),
      });
  }

  handlePageEvent(event: PageEvent) {
    if (this.isAllCategoriesSelected) {
      this.getAllProducts(event.pageIndex + 1, event.pageSize);
    } else {
      this.getProductsBySelectedCategory(event.pageIndex + 1, event.pageSize);
    }
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.isAllCategoriesSelected = false;
    this.searchQuery = '';
    this.selectedIngredients = [];
    this.isMobileSidebarOpen = false;
    this.getProductsBySelectedCategory();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectAllCategories() {
    this.isAllCategoriesSelected = true;
    this.searchQuery = '';
    this.selectedIngredients = [];
    this.isMobileSidebarOpen = false;
    this.getAllProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getAllProducts(pageIndex: number = 1, pageSize: number = this.productPageSize) {
    this.http.getPage('/products', pageIndex, pageSize).subscribe({
      next: (page) => {
        this.productPageContent = page as unknown as Page<Product>;
        this.products = this.productPageContent?.data;
        this.extractAllIngredients();
        this.filterProducts();
      },
      error: (error) => console.log('ERROR ' + error.status),
    });
  }

  addToCart(product: Product) {
    if (this.showCart) {
      this.cartService.addToCart(product.id, 1);
    }
  }

  toggleMobileSidebar() {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  toggleFilters() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  toggleIngredient(ingredient: Ingredient) {
    const index = this.selectedIngredients.findIndex((i) => i.id === ingredient.id);
    if (index > -1) {
      this.selectedIngredients.splice(index, 1);
    } else {
      this.selectedIngredients.push(ingredient);
    }
    this.filterProducts();
  }

  isIngredientSelected(ingredient: Ingredient): boolean {
    return this.selectedIngredients.some((i) => i.id === ingredient.id);
  }

  extractAllIngredients() {
    const ingredientsMap = new Map<number, Ingredient>();
    this.products.forEach((product) => {
      product.ingredients?.forEach((ingredient) => {
        if (!ingredientsMap.has(ingredient.id)) {
          ingredientsMap.set(ingredient.id, ingredient);
        }
      });
    });
    this.allIngredients = Array.from(ingredientsMap.values());
  }

  filterProducts() {
    let filtered = [...this.products];

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.ingredients?.some((ing) => ing.name.toLowerCase().includes(query)),
      );
    }

    if (this.selectedIngredients.length > 0) {
      filtered = filtered.filter((product) =>
        this.selectedIngredients.every((selectedIng) =>
          product.ingredients?.some((ing) => ing.id === selectedIng.id),
        ),
      );
    }

    this.filteredProducts = filtered;
  }

  clearFilters() {
    this.selectedIngredients = [];
    this.filterProducts();
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedIngredients = [];
    this.selectedCategory = this.categories[0];
    this.getProductsBySelectedCategory();
  }
}
