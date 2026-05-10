// src/app/perfs-dashboard/perfs-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PerfRun } from 'src/app/model/perf-run';
import { PerfRunService } from 'src/app/service/perfs-run.service';

type Trend = 'up' | 'down' | 'equal';

@Component({
  selector: 'app-perfs-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './perfs-dashboard.component.html',
  styleUrls: ['./perfs-dashboard.component.scss'],
})
export class PerfsDashboardComponent implements OnInit {
  apps = ['way2home-autocomplete', 'way2home-search', 'way2home-api'];
  scenarios = ['smoke', 'load', 'stress'];

  selectedApp = this.apps[0];
  selectedScenario = this.scenarios[0];

  from?: Date;
  to?: Date;

  latest?: PerfRun;
  history: PerfRun[] = [];

  chartData: ChartData<'line'> = { labels: [], datasets: [] };
  chartOptions: ChartOptions = {};

  trendP95?: Trend;
  trendScore?: Trend;
  trendErrors?: Trend;

  constructor(private api: PerfRunService) {}

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    const fromStr = this.from ? this.from.toISOString() : undefined;
    const toStr = this.to ? this.to.toISOString() : undefined;

    this.api
      .getLatest(this.selectedApp, this.selectedScenario)
      .subscribe((r) => (this.latest = r));

    this.api
      .getHistory(this.selectedApp, this.selectedScenario, fromStr, toStr)
      .subscribe((h) => {
        this.history = h.sort((a, b) => a.date.localeCompare(b.date)); // tri par date
        this.buildChart();
        this.computeTrends();
      });
  }

  private buildChart(): void {
    this.chartData = {
      labels: this.history.map((r) => new Date(r.date).toLocaleString()),
      datasets: [
        {
          label: 'p95 (ms)',
          data: this.history.map((r) => r.p95),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.15)',
          tension: 0.3,
          yAxisID: 'y',
        },
        {
          label: 'Score',
          data: this.history.map((r) => r.globalScore),
          borderColor: '#22c55e',
          backgroundColor: 'rgba(34,197,94,0.15)',
          tension: 0.3,
          yAxisID: 'y1',
        },
        {
          label: 'Erreurs (%)',
          data: this.history.map((r) => r.httpReqFailed * 100),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,0.15)',
          tension: 0.3,
          yAxisID: 'y1',
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
      },
      scales: {
        y: {
          title: { display: true, text: 'p95 (ms)' },
        },
        y1: {
          position: 'right',
          title: { display: true, text: 'Score / Erreurs (%)' },
          grid: { drawOnChartArea: false },
        },
      },
    };
  }

  private computeTrends(): void {
    if (this.history.length < 2) {
      this.trendP95 = this.trendScore = this.trendErrors = undefined;
      return;
    }

    const last = this.history[this.history.length - 1];
    const prev = this.history[this.history.length - 2];

    this.trendP95 = this.compare(prev.p95, last.p95, 'lower-is-better');
    this.trendScore = this.compare(
      prev.globalScore,
      last.globalScore,
      'higher-is-better',
    );
    this.trendErrors = this.compare(
      prev.httpReqFailed,
      last.httpReqFailed,
      'lower-is-better',
    );
  }

  private compare(
    prev: number,
    curr: number,
    mode: 'higher-is-better' | 'lower-is-better',
  ): Trend {
    if (curr === prev) return 'equal';
    if (mode === 'higher-is-better') {
      return curr > prev ? 'up' : 'down';
    } else {
      return curr < prev ? 'up' : 'down';
    }
  }

  getStatusClass(): string {
    if (!this.latest) return '';
    return this.latest.status.toLowerCase();
  }
}
