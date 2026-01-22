import { Component } from '@angular/core';
import { NewsCard } from "../../ui/c-news-card/c-news-card";

@Component({
  selector: 'app-p-home',
  imports: [NewsCard],
  templateUrl: './p-home.html',
  styleUrl: './p-home.scss',
})
export class PHome {

}
