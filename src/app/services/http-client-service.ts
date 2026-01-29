import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private baseUrl = "http://localhost:8080/api";

  httpClient = inject(HttpClient);

  constructor() { }

  getAll<T>(url: string): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.baseUrl + url}`);
  }

  getPage<T>(url: string, pageIndex: number, pageSize: number): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.baseUrl + url}?page=${pageIndex}&size=${pageSize}`);
  }

  // Metdo temporal para obtener los usuarios
  getAllArray<T>(url: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.baseUrl + url}`);
  }
}
