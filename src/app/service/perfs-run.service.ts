import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PerfRun } from '../model/perf-run';

@Injectable({ providedIn: 'root' })
export class PerfRunService {
  private baseUrl = 'http://localhost:8080/api/perf/runs';

  constructor(private http: HttpClient) {}
  /*
  getLatest(app: string, scenario: string): Observable<PerfRun> {
    return this.http.get<PerfRun>(`${this.baseUrl}/latest`, {
      params: { app, scenario },
    });
  }
    */
  getLatest(app: string, scenario: string): Observable<PerfRun> {
    return this.http.get<PerfRun>(
      `${this.baseUrl}/latest?app=${app}&scenario=${scenario}`,
    );
  }

  getPrevious(app: string, scenario: string): Observable<PerfRun> {
    return this.http.get<PerfRun>(
      `${this.baseUrl}/previous?app=${app}&scenario=${scenario}`,
    );
  }

  getHistory(app: string, scenario: string): Observable<PerfRun[]> {
    return this.http.get<PerfRun[]>(`${this.baseUrl}/history`, {
      params: { app, scenario },
    });
  }

  getById(id: number): Observable<PerfRun> {
    return this.http.get<PerfRun>(`${this.baseUrl}/${id}`).pipe(
      map((run) => {
        try {
          const parsed = JSON.parse(run.rawSummaryJson);
          run.parsedMetrics = parsed.metrics;
        } catch {
          run.parsedMetrics = null;
        }
        return run;
      }),
    );
  }
}
