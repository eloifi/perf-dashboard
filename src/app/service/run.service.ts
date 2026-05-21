import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PerfRun } from '../model/perf-run';

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
  private baseUrl = '/api/runs';

  constructor(private http: HttpClient) {}

  getRuns(app: string): Observable<Run[]> {
    return this.http.get<Run[]>(this.baseUrl, { params: { app } });
  }

  getRun(id: string, app: string): Observable<Run> {
    return this.http.get<Run>(`${this.baseUrl}/${id}`, { params: { app } });
  }

  getRunIds(app: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/ids`, { params: { app } });
  }

  getRunComparison(id: string, app: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}/compare`, {
      params: { app },
    });
  }

  getById(id: number): Observable<PerfRun> {
    return this.http.get<PerfRun>(`${this.baseUrl}/runs/${id}`).pipe(
      map((run) => {
        try {
          const parsed = JSON.parse(run.rawSummaryJson);
          run.parsedMetrics = parsed.metrics; // <-- IMPORTANT
        } catch (e) {
          run.parsedMetrics = null;
        }
        return run;
      }),
    );
  }
}
