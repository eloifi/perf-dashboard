import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfRun } from '../model/perf-run';

@Injectable({ providedIn: 'root' })
export class PerfRunService {
  private baseUrl = 'http://localhost:8080/api/perf/runs';

  constructor(private http: HttpClient) {}

  getLatest(app: string, scenario: string): Observable<PerfRun> {
    return this.http.get<PerfRun>(`${this.baseUrl}/latest`, {
      params: { app, scenario },
    });
  }

  getHistory(app: string, scenario: string): Observable<PerfRun[]> {
    return this.http.get<PerfRun[]>(`${this.baseUrl}/history`, {
      params: { app, scenario },
    });
  }

  getById(id: number): Observable<PerfRun> {
    return this.http.get<PerfRun>(`${this.baseUrl}/${id}`);
  }
}
