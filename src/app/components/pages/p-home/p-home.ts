import { Component } from '@angular/core';
import { PromoComponent } from '../../promo/promo';
import { HeroComponent } from '../../hero/hero';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-p-home',
  imports: [PromoComponent, HeroComponent, RouterLink],
  templateUrl: './p-home.html',
  styleUrl: './p-home.scss',
})
export class PHome {

  menuItems = [
    {
      title: "Cangrejo Real",
      price: "$45.00",
      img: "https://images.unsplash.com/photo-1695606452818-f22013a5c2de?..."
    },
    {
      title: "Paella Marinera",
      price: "$32.00",
      img: "https://images.unsplash.com/photo-1623961990059-28356e226a77?..."
    },
    {
      title: "Pescado a la Parrilla",
      price: "$28.00",
      img: "https://images.unsplash.com/photo-1580302498882-b5aa77f09b75?..."
    }
  ];

}
