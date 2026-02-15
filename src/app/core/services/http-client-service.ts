import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { AuthService } from './auth-service';


@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private baseUrl = "http://localhost:8080/api";

  httpClient = inject(HttpClient);
  authService = inject(AuthService);
  token = this.authService.getToken();

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getPage<T>(url: string, pageIndex: number, pageSize: number): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.baseUrl + url}?page=${pageIndex}&size=${pageSize}`);
  }

  getWithAuth<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${url}`, { headers: this.getAuthHeaders() });
  }

  postWithAuth<T>(url: string, body: any) {
    return this.httpClient.post<T>(`${this.baseUrl}${url}`, body, { headers: this.getAuthHeaders() });
  }

  putWithAuth<T>(url: string, body: any) {
    return this.httpClient.put<T>(`${this.baseUrl}${url}`, body, { headers: this.getAuthHeaders() })
  }

  deleteWithAuth<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}${url}`, { headers: this.getAuthHeaders() });
  }

  deleteWithAuthAndBody<T>(url: string, body: any): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}${url}`, { headers: this.getAuthHeaders(), body });
  }
}