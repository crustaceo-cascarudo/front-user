import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { CButton } from "../ui/c-button/c-button";
//import { LoginService } from '../../services/loginService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavBar {
  //loginService = inject(LoginService)
  router = inject(Router);
  showLogOutPanel: boolean = false;
  
  logOut(){
    //this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}
