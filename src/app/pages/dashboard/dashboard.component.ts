import { Component, OnInit } from '@angular/core';
import { PerfRun } from 'src/app/model/perf-run';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { DiffRunsPageComponent } from '../diff-runs/diff-runs-page.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [DiffRunsPageComponent],
})
export class DashboardComponent implements OnInit {
  app = 'way2home';
  scenario = 'default';

  runs: PerfRun[] = [];
  runAId: number | null = null;
  runBId: number | null = null;

  dense = false;
  dark = false;

  section: 'summary' | 'metrics' | 'score' | 'trend' = 'summary';

  baselineId = 1;
  baselineRun: PerfRun | null = null;
  baselineIds = [1, 5, 10];
  baselines: PerfRun[] = [];

  trend: PerfRun[] = [];

  constructor(private perfService: PerfRunService) {}

  ngOnInit() {
    this.loadRunsList();
    this.loadBaseline();
    this.loadMultiBaseline();
    this.loadTrend();
    this.autoDark();
  }

  autoDark() {
    const hour = new Date().getHours();
    this.dark = hour >= 19 || hour < 7;
  }

  loadRunsList() {
    this.perfService.getRuns(this.app, this.scenario).subscribe((runs) => {
      this.runs = runs;
      if (runs.length > 0) {
        this.runAId = runs[0].id;
        this.runBId = runs.length > 1 ? runs[1].id : runs[0].id;
      }
    });
  }

  loadBaseline() {
    this.perfService
      .getById(String(this.baselineId))
      .subscribe((r) => (this.baselineRun = r));
  }

  loadMultiBaseline() {
    this.baselineIds.forEach((id) => {
      this.perfService
        .getById(String(id))
        .subscribe((r) => this.baselines.push(r));
    });
  }

  loadTrend() {
    this.perfService.getRuns(this.app, this.scenario).subscribe((runs) => {
      this.trend = runs.slice(0, 10);
    });
  }

  onSelectionChange(sel: { runAId: number | null; runBId: number | null }) {
    this.runAId = sel.runAId;
    this.runBId = sel.runBId;
  }
}
