import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AddressSuggestion {
  full: string;
}

@Injectable({ providedIn: 'root' })
export class AddressService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<AddressSuggestion[]> {
    return this.http.get<AddressSuggestion[]>(`/api/autocomplete?q=${query}`);
  }
}
