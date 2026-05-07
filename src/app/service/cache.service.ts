import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CacheService {
  private store = new Map<string, Observable<unknown>>();

  get<T>(key: string): Observable<T> | undefined {
    return this.store.get(key) as Observable<T> | undefined;
  }

  set<T>(key: string, value: Observable<T>): void {
    this.store.set(key, value);
  }

  clear(key?: string): void {
    if (key) this.store.delete(key);
    else this.store.clear();
  }
}
