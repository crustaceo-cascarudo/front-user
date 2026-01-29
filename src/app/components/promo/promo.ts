import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-promo',
  standalone: true,
  imports: [],
  templateUrl: './promo.html',
  styleUrl: './promo.scss',
})
export class PromoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('promoImage') promoImage!: ElementRef;
  private observer?: IntersectionObserver;

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