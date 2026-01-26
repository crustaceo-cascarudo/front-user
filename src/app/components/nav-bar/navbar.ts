import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CButton } from "../ui/c-button/c-button";
import { MatIcon } from '@angular/material/icon';
import { LoginService } from '../../services/login-service';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CButton, MatIcon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavBar {
  loginService = inject(LoginService);
  router = inject(Router);
  showLogOutPanel: boolean = false;

  hoveredReserva: boolean = false;
  hoveredADomicilio: boolean = false;

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}
