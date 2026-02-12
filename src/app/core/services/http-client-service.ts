import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';


@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private baseUrl = "https://api-store-class.ishimi.es/api";

  httpClient = inject(HttpClient);

  getById<T>(url: string, id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${url}/${id}`);
  }

  getPage<T>(url: string, pageIndex: number, pageSize: number): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.baseUrl + url}?page=${pageIndex}&size=${pageSize}`);
  }

  postItem<T>(url: string, item: T) {
    return this.httpClient.post<T>(`${this.baseUrl}${url}`, item); //TODO -> Make sure this works
  }
}