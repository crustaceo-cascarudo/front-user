import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { LoginResponse } from '../models/user/login-response';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { userRole } from '../core/enum/user-role';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  url = "https://api-store-class.ishimi.es/api/users/";
  loginUrl = this.url + 'login';
  registerUrl = this.url + 'register';

  logIn(email: string, plainPassword: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { email, plainPassword }).pipe(
      tap({
        next: (datos) => {
          console.log('Login response:', datos);
          if (datos.token != null && datos.token != "" && datos.user) {
            this.authService.setToken(datos.token);
            console.log('Token guardado:', datos.token);
            console.log('Usuario logueado:', datos.user);
            this.router.navigate(['/']);
          } else {
            this.authService.removeToken();
            alert("Contraseña incorrecta");
          }
        },
        error: (error) => console.log('ERROR LOGIN:', error.status)
      })
    );
  }


  register(name: string, email: string, password: string, role: userRole): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.registerUrl, { name, email, password, role }).pipe(
      tap({
        next: (datos) => {
          console.log(datos);
          this.logIn(email, password).subscribe();
        },
        error: (error) => console.log('ERROR JSON SERVER' + error.status)
      })
    );
  }

  logOut(): Observable<any> {
    return this.authService.logout();
  }
}