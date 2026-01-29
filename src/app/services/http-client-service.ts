import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private baseUrl !: string;

  httpClient = inject(HttpClient);

  constructor() {
    this.httpClient.get('assets/config.json').subscribe((config: any) => {
      this.baseUrl = config.apiUrl;
    });
  }

  getById<T>(url: string, id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.baseUrl}${url}/${id}`);
  }

  getPage<T>(url: string, pageIndex: number, pageSize: number): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.baseUrl + url}?page=${pageIndex}&size=${pageSize}`);
  }
}