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

  getById<T>(url: string, id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${url}/${id}`);
  }

  getPage<T>(url: string, pageIndex: number, pageSize: number): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.baseUrl + url}?page=${pageIndex}&size=${pageSize}`);
  }

  postItem<T>(url: string, item: any) {
    const token = this.authService.getToken();
    // console.log(token);
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });

    return this.httpClient.post<T>(`${this.baseUrl}${url}`, item, {headers}); //TODO -> Make sure this works
  }
}