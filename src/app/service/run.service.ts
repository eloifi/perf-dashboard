import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Run {
  id: string;
  application: string;
  date: string;
  p95: number;
  p99: number;
  avg: number;
  vus: number;
  iterations: number;
  http_req_failed: number;
  http_req_duration: {
    min: number;
    max: number;
    median: number;
  };
}

@Injectable({ providedIn: 'root' })
export class RunService {
  constructor(private http: HttpClient) {}

  getRuns(app: string): Observable<Run[]> {
    return this.http.get<Run[]>(`/api/runs?app=${app}`);
  }

  getRunIds(app: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/runs?app=${app}`);
  }

  getRun(id: string, app: string): Observable<Run> {
    return this.http.get<Run>(`/api/runs/${id}?app=${app}`);
  }
}
