import { Component, OnInit } from '@angular/core';
import { PerfRun } from 'src/app/model/perf-run';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { ErrorRateChartComponent } from '../../  components/error-rate-chart/error-rate-chart.component';
import { P95ChartComponent } from '../../  components/p95-chart/p95-chart.component';
import { RunLatestComponent } from 'src/app/  components/run-latest/run-latest.component';
import { RunsListComponent } from 'src/app/  components/runs-list/runs-list.component';

@Component({
  selector: 'app-dashboard-old',
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
export class DashboardOldComponent implements OnInit {
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
