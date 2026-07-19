import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfRun } from '../model/perf-run';
import { PerfRunComparison } from '../model/perf-run-comparison.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PerfRunService {
  private baseUrl = '/api/perf-runs';

  constructor(private http: HttpClient) {}

  getLatest(app: string, scenario: string): Observable<PerfRun> {
    return this.http.get<PerfRun>(
      `${this.baseUrl}/latest?app=${app}&scenario=${scenario}`,
    );
  }

  getComparison(app: string, scenario: string): Observable<PerfRunComparison> {
    return this.http.get<PerfRunComparison>(
      `${this.baseUrl}/comparison?app=${app}&scenario=${scenario}`,
    );
  }

  getHistory(app: string, scenario: string): Observable<PerfRun[]> {
    return this.http.get<PerfRun[]>(
      `${this.baseUrl}/history?app=${app}&scenario=${scenario}`,
    );
  }

  getById(id: string): Observable<PerfRun> {
    return this.http.get<PerfRun>(`${this.baseUrl}/${id}`);
  }
}
