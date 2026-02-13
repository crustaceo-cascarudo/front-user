import { Component, inject } from '@angular/core';
import { PromoComponent } from '../../promo/promo';
import { HeroComponent } from '../../hero/hero';
import { RouterLink } from "@angular/router";
import { HttpClientService } from '../../../core/services/http-client-service';
import { Product } from '../../../models/menu/product';

@Component({
  selector: 'p-home',
  imports: [PromoComponent, HeroComponent, RouterLink],
  templateUrl: './p-home.html',
  styleUrl: './p-home.scss',
})
export class PHome {
  http = inject(HttpClientService);
  
  menuItems: { title: string; price: string; img: string }[] = [];

  ngOnInit() {
    this.loadRandomProducts();
  }

  loadRandomProducts() {
    // Cargar todos los productos (puedes ajustar el pageSize si tienes muchos productos)
    this.http.getPage<Product>('/products', 1, 100).subscribe({
      next: (page) => {
        const allProducts = page.data;
        // Seleccionar 3 productos aleatorios
        const randomProducts = this.getRandomItems(allProducts, 3);
        
        // Mapear a la estructura que usa el template
        this.menuItems = randomProducts.map(product => ({
          title: product.name,
          price: `$${product.finalPrice.toFixed(2)}`,
          img: product.image
        }));
      },
      error: (error) => console.log('ERROR loading products:', error)
    });
  }

  getRandomItems<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
