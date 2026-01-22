import { Component, Input } from '@angular/core';
import { CButton } from "../c-button/c-button";

@Component({
  selector: 'c-news-card',
  imports: [CButton],
  templateUrl: './c-news-card.html',
  styleUrl: './c-news-card.scss',
})
export class NewsCard {
@Input() title: string = '';
@Input() imageUrl: string = '';
@Input() description: string = '';
@Input() buttonText: string = '';
}
