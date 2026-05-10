import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Run {
  id: string;
  app: string;
  date: string;
  p95: number;
  p99: number;
  http_req_failed: number;
}

@Injectable({ providedIn: 'root' })
export class RunService {
  private base = '/api/runs';

  constructor(private http: HttpClient) {}

  getRuns(app: string): Observable<Run[]> {
    return this.http.get<Run[]>(this.base, { params: { app } });
  }

  getRun(id: string, app: string): Observable<Run> {
    return this.http.get<Run>(`${this.base}/${id}`, { params: { app } });
  }

  getRunIds(app: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/ids`, { params: { app } });
  }

  getRunComparison(id: string, app: string): Observable<any> {
    return this.http.get<any>(`${this.base}/${id}/compare`, {
      params: { app },
    });
  }
}
