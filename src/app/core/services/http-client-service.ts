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


  getById<T>(url: string, id: number): Observable<T> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.httpClient.get<T>(`${this.baseUrl}${url}/${id}`, { headers });
  }

  getPage<T>(url: string, pageIndex: number, pageSize: number): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.baseUrl + url}?page=${pageIndex}&size=${pageSize}`);
  }

  postItem<T>(url: string, item: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.httpClient.post<T>(`${this.baseUrl}${url}`, item, { headers }); //TODO -> Make sure this works
  }

  putItem<T>(url: string, item: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.httpClient.put<T>(`${this.baseUrl}${url}`, item, { headers })
  }

  deleteItem<T>(url: string, item: any) {
    
  }
}