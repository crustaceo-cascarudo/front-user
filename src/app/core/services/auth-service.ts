import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private userId: number | undefined = undefined;
  private baseUrl = "https://api-store-class.ishimi.es/api";
  private httpClient = inject(HttpClient);

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post(`${this.baseUrl}/users/logout`, {}, { headers }).pipe(
      tap(() => {
        this.removeToken();
      })
    );
  }

  setUserId(id: number){
    this.userId = id;
  }

  getUserId(): number | undefined {
    return this.userId;
  }
}

