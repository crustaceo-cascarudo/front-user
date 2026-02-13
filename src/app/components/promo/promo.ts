import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { HttpClientService } from '../../core/services/http-client-service';
import { Product } from '../../models/menu/product';

@Component({
  selector: 'app-promo',
  standalone: true,
  imports: [],
  templateUrl: './promo.html',
  styleUrl: './promo.scss',
})
export class PromoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('promoImage') promoImage!: ElementRef;
  private observer?: IntersectionObserver;
  http = inject(HttpClientService);
  
  promoImageUrl: string = 'https://images.unsplash.com/photo-1695606452818-f22013a5c2de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

  ngOnInit() {
    this.loadRandomPromoImage();
  }

  loadRandomPromoImage() {
    // Cargar todos los productos
    this.http.getPage<Product>('/products', 1, 100).subscribe({
      next: (page) => {
        const allProducts = page.data;
        // Seleccionar un producto aleatorio
        const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];
        
        if (randomProduct && randomProduct.image) {
          this.promoImageUrl = randomProduct.image;
        }
      },
      error: (error) => console.log('ERROR loading promo image:', error)
    });
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('promo__image-wrapper--visible');
          } else {
            entry.target.classList.remove('promo__image-wrapper--visible');
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    if (this.promoImage) {
      this.observer.observe(this.promoImage.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}