import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';


@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private baseUrl = "https://api-store-class.ishimi.es/api";

  httpClient = inject(HttpClient);

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getById<T>(url: string, id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${url}/${id}`);
  }

  getPage<T>(url: string, pageIndex: number, pageSize: number): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.baseUrl + url}?page=${pageIndex}&size=${pageSize}`);
  }

  postItem<T>(url: string, item: any) {
    return this.httpClient.post<T>(`${this.baseUrl}${url}`, item);
  }

  // Authenticated methods
  getAuth<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${url}`, { headers: this.getAuthHeaders() });
  }

  postAuth<T>(url: string, body: any): Observable<T> {
    return this.httpClient.post<T>(`${this.baseUrl}${url}`, body, { headers: this.getAuthHeaders() });
  }

  putAuth<T>(url: string, body: any): Observable<T> {
    return this.httpClient.put<T>(`${this.baseUrl}${url}`, body, { headers: this.getAuthHeaders() });
  }

  deleteAuth<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}${url}`, { headers: this.getAuthHeaders() });
  }

  deleteAuthWithBody<T>(url: string, body: any): Observable<T> {
    return this.httpClient.delete<T>(`${this.baseUrl}${url}`, { headers: this.getAuthHeaders(), body });
  }
}