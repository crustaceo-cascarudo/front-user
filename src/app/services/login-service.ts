import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { LoginResponse } from '../models/user/login-response';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  url = 'http://localhost:8080/api/users/';
  loginUrl = this.url + 'login';
  registerUrl = this.url + 'register';

  logIn(email: string, plainPassword: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { email, plainPassword }).pipe(
      tap({
        next: (datos) => {
          console.log('Login response:', datos);
          if (datos.token != null && datos.token != "" && datos.userResponse) {
            this.authService.setToken(datos.token);
            this.authService.setUserId(datos.userResponse.id);
            console.log('Token y userId guardados:', datos.userResponse);
            this.router.navigate(['/dashboard']);
          } else {
            this.authService.removeToken();
            this.authService.removeUserId();
            alert("Contraseña incorrecta");
          }
        },
        error: (error) => console.log('ERROR LOGIN:', error.status)
      })
    );
  }


  register(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.registerUrl, { email, password }).pipe(
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
