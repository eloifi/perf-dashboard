import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PerfRun } from '../model/perf-run';
import { PerfRunComparison } from '../model/perf-run-comparison.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PerfRunService {
  private baseUrl = `${environment.perfs_URL}/perf-runs`;

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

  getScenarios(app: string) {
    return this.http.get<string[]>(`${this.baseUrl}/scenarios?app=${app}`);
  }

  getApps() {
    return this.http.get<string[]>(`${this.baseUrl}/apps`);
  }

  getById(id: string): Observable<PerfRun> {
    return this.http.get<PerfRun>(`${this.baseUrl}/${id}`);
  }

  getRuns(app: string, scenario: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}/list?app=${app}&scenario=${scenario}`,
    );
  }
}
