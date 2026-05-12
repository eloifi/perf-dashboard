// src/app/service/alerts.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PerfAlert {
  id: number;
  runId: number;
  level: 'info' | 'warning' | 'critical';
  message: string;
  metric?: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AlertsService {
  private base = '/api/alerts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PerfAlert[]> {
    return this.http.get<PerfAlert[]>(`${this.base}`);
  }

  getByRun(runId: number): Observable<PerfAlert[]> {
    return this.http.get<PerfAlert[]>(`${this.base}/run/${runId}`);
  }

  getOne(id: number): Observable<PerfAlert> {
    return this.http.get<PerfAlert>(`${this.base}/${id}`);
  }
}
