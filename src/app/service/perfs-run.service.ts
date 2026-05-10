import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfRun } from '../model/perf-run';

@Injectable({ providedIn: 'root' })
export class PerfRunService {
  private base = '/api/perf/runs';

  constructor(private http: HttpClient) {}

  getLatest(app: string, scenario: string): Observable<PerfRun> {
    return this.http.get<PerfRun>(`${this.base}/latest`, {
      params: { app, scenario },
    });
  }

  getLatestComparison(app: string, scenario: string) {
    return this.http.get<any>(`${this.base}/compare/latest`, {
      params: { app, scenario },
    });
  }

  getHistory(
    app: string,
    scenario: string,
    from?: string,
    to?: string,
  ): Observable<PerfRun[]> {
    const params: any = { app, scenario };
    if (from) params.from = from;
    if (to) params.to = to;

    return this.http.get<PerfRun[]>(`${this.base}/history`, { params });
  }
}
