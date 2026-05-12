import { Component, OnInit } from '@angular/core';
import { PerfRun } from 'src/app/model/perf-run';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { ErrorRateChartComponent } from '../error-ratechart/error-rate-chart.component';
import { RunLatestComponent } from '../latest/run-latest.component';
import { P95ChartComponent } from '../p95-chart/p95-chart.component';
import { RunsListComponent } from '../runs-list/runs-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RunLatestComponent,
    RunsListComponent,
    P95ChartComponent,
    ErrorRateChartComponent,
  ],
  template: `
    <app-run-latest [run]="latest"></app-run-latest>

    <app-p95-chart [runs]="history"></app-p95-chart>

    <app-error-rate-chart [runs]="history"></app-error-rate-chart>

    <app-runs-list [runs]="history"></app-runs-list>
  `,
})
export class DashboardComponent implements OnInit {
  latest!: PerfRun;
  history: PerfRun[] = [];

  constructor(private service: PerfRunService) {}

  ngOnInit() {
    this.service
      .getLatest('way2home-search', 'load')
      .subscribe((r) => (this.latest = r));
    this.service
      .getHistory('way2home-search', 'load')
      .subscribe((r) => (this.history = r));
  }
}
