import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./components/nav-bar/navbar";
import { Footer } from "./components/footer/footer";
import { CButton } from "./components/ui/c-button/c-button";
import { AuthService } from './core/services/auth-service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, Footer, CButton],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('front-user');

  authService = inject(AuthService);
  sanitizer = inject(DomSanitizer);

  chatBotUrl: string = "https://landbot.online/v3/H-3316193-TRFFWKXKMYOIDATO/index.html" + `?isloggedin=${this.authService.isLoggedIn()}`;
  showChatBot: boolean = false;


  chatBotSanitizedUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.chatBotUrl);
  }
}
