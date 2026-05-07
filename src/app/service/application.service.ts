import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

export interface Application {
  name: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  constructor(private http: HttpClient) {}

  getApplications(): Observable<string[]> {
    return this.http.get<string[]>('/api/applications');
  }
}
