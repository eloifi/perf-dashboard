import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MetricPoint } from '../models/metric-point';

@Injectable({ providedIn: 'root' })
export class MetricsService {
  getDailyP95(app: string, scenario: string): Observable<MetricPoint[]> {
    return of(this.generatePoints(24 * 60, 60000)); // 1 point/minute
  }

  getMonthlyP95(app: string, scenario: string): Observable<MetricPoint[]> {
    return of(this.generatePoints(30, 24 * 3600 * 1000)); // 1 point/jour
  }

  getYearlyP95(app: string, scenario: string): Observable<MetricPoint[]> {
    return of(this.generatePoints(12, 30 * 24 * 3600 * 1000)); // 1 point/mois
  }

  private generatePoints(count: number, step: number): MetricPoint[] {
    const now = Date.now();
    return Array.from({ length: count }).map((_, i) => ({
      timestamp: now - (count - i) * step,
      value: 50 + Math.random() * 200, // simulate p95
    }));
  }
}
