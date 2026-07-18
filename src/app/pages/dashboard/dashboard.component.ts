import { Component, OnInit } from '@angular/core';
import { ErrorRateChartComponent } from 'src/app/components/error-rate-chart/error-rate-chart.component';
import { P95ChartComponent } from 'src/app/components/p95-chart/p95-chart.component';
import { RunLatestComponent } from 'src/app/components/run-latest/run-latest.component';
import { RunsListComponent } from 'src/app/components/runs-list/runs-list.component';
import { PerfRun } from 'src/app/model/perf-run';
import { PerfRunService } from 'src/app/service/perfs-run.service';

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
    <!--     <app-run-latest [run]="latest"></app-run-latest> -->
    <app-run-latest></app-run-latest>

    <app-p95-chart [runs]="history"></app-p95-chart>

    <app-error-rate-chart [runs]="history"></app-error-rate-chart>

    <app-runs-list [runs]="history"></app-runs-list>
  `,
})
export class DashboardComponent implements OnInit {
  latest!: PerfRun;
  history: PerfRun[] = [];

  runA?: PerfRun; // latest
  runB?: PerfRun; // previous
  constructor(private service: PerfRunService) {}

  ngOnInit() {
    this.service.getLatest('way2home', 'search').subscribe((run) => {
      this.runA = run;
    });
    this.service.getPrevious('way2home', 'search').subscribe((run) => {
      this.runB = run;
    });
  }
}
