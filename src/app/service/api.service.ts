import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = '/api';

  constructor(
    private http: HttpClient,
    private cache: CacheService,
  ) {}

  get<T>(url: string, cacheKey?: string): Observable<T> {
    if (cacheKey) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) return cached;
    }

    const req$ = this.http.get<T>(`${this.baseUrl}${url}`).pipe(shareReplay(1));
    if (cacheKey) this.cache.set(cacheKey, req$);
    return req$;
  }

  post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body);
  }
}
