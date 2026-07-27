import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { PerfRun } from 'src/app/model/perf-run';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { LineChartYearlyComponent } from 'src/app/observability/charts/line-chart-yearly.component';
import { LineChartMonthlyComponent } from 'src/app/observability/charts/line-chart-monthly.component';
import { LineChartDailyComponent } from 'src/app/observability/charts/line-chart-daily.component';

type HealthColor = 'green' | 'yellow' | 'red' | 'critical';

@Component({
  selector: 'tv-dashboard',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule, // <-- CORRECT pour ngModel
    UpperCasePipe, // <-- CORRECT pour | uppercase
    LineChartDailyComponent,
    LineChartMonthlyComponent,
    LineChartYearlyComponent,
  ],
  templateUrl: './tv-dashboard.component.html',
})
export class TvDashboardComponent implements OnInit {
  apps = ['way2home', 'billing', 'checkout', 'search', 'auth'];
  scenarios = ['default', 'load', 'peak', 'night'];

  app = 'way2home';
  scenario = 'default';

  runs: PerfRun[] = [];
  latestRun: PerfRun | null = null;
  previousRun: PerfRun | null = null;

  globalP95 = 0;
  globalError = 0;
  globalScore = 0;
  globalThroughput = 0;
  healthLabel = 'OK';
  trend: PerfRun[] = [];
  baselines: PerfRun[] = [];

  healthColor: HealthColor = 'green';
  alertMessage: string | null = null;

  constructor(private perfService: PerfRunService) {}

  ngOnInit() {
    this.refreshAll();
    setInterval(() => this.refreshAll(), 5000);
  }

  refreshAll() {
    this.perfService.getRuns(this.app, this.scenario).subscribe((runs) => {
      this.runs = runs;
      this.latestRun = runs[0] ?? null;
      this.previousRun = runs[1] ?? null;
      this.trend = runs.slice(0, 10);

      this.computeGlobal();
      this.computeHealth();
      this.loadBaselines();
    });
  }

  loadBaselines() {
    const baselineIds = [1, 5, 10];
    this.baselines = [];
    baselineIds.forEach((id) => {
      this.perfService
        .getById(String(id))
        .subscribe((r) => this.baselines.push(r));
    });
  }

  computeGlobal() {
    if (!this.latestRun) {
      this.globalP95 = 0;
      this.globalError = 0;
      this.globalScore = 0;
      this.globalThroughput = 0;
      return;
    }
    this.globalP95 = this.latestRun.p95;
    this.globalError = this.latestRun.errorRate;
    this.globalScore = this.latestRun.globalScore;
    this.globalThroughput = this.latestRun.throughput ?? 0;
  }

  computeHealth() {
    const p95 = this.globalP95;
    const err = this.globalError;
    const score = this.globalScore;

    if (p95 > 1000 || err > 5 || score < 20) {
      this.healthColor = 'critical';
      this.alertMessage = 'CRITIQUE: Latence ou erreurs très élevées';
      return;
    }

    if (p95 > 500 || err > 1 || score < 50) {
      this.healthColor = 'red';
      this.alertMessage = 'ALERTE: Dégradation sévère des performances';
      return;
    }

    if (p95 > 200 || err > 0.1 || score < 90) {
      this.healthColor = 'yellow';
      this.alertMessage = 'ATTENTION: Dégradation légère détectée';
      return;
    }

    this.healthColor = 'green';
    this.alertMessage = null;
  }

  getHealthClass(): string {
    switch (this.healthColor) {
      case 'green':
        return 'bg-green-700';
      case 'yellow':
        return 'bg-yellow-600';
      case 'red':
        return 'bg-red-700';
      case 'critical':
        return 'bg-red-800 blink';
    }
  }

  getRunColor(run: PerfRun | null): string {
    if (!run) return 'bg-gray-700';
    if (run.p95 > 1000 || run.errorRate > 5 || run.globalScore < 20)
      return 'bg-red-800 blink';
    if (run.p95 > 500 || run.errorRate > 1 || run.globalScore < 50)
      return 'bg-red-700';
    if (run.p95 > 200 || run.errorRate > 0.1 || run.globalScore < 90)
      return 'bg-yellow-600';
    return 'bg-green-700';
  }

  // Angular standalone n'autorise pas Math.min dans le template
  safeMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  get trendP95(): number[] {
    return this.trend.map((r) => r.p95);
  }

  get trendError(): number[] {
    return this.trend.map((r) => r.errorRate);
  }

  get trendScore(): number[] {
    return this.trend.map((r) => r.globalScore);
  }

  get baselineDeltas(): { id: number; deltaP95: number }[] {
    if (!this.latestRun || !this.baselines.length) return [];
    return this.baselines.map((b) => ({
      id: Number(b.id),
      deltaP95: this.latestRun!.p95 - b.p95,
    }));
  }
}
