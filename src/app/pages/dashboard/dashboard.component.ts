import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PerfRun } from '../../model/perf-run';
import { PerfRunComparison } from '../../model/perf-run-comparison.model';
import { PerfRunService } from '../../service/perfs-run.service';
import { RunCardComponent } from '../../shared/components/run-card/run-card.component';
import { ComparisonCardComponent } from '../../shared/components/comparison-card/comparison-card.component';
import { HistoryChartComponent } from '../../shared/components/history-chart/history-chart.component';
import { AppSelectorComponent } from '../app-selector/app-selector.component';
import { DiffRunsPageComponent } from '../diff-runs/diff-runs-page.component'; // ← AJOUT

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RunCardComponent,
    ComparisonCardComponent,
    HistoryChartComponent,
    AppSelectorComponent,
    DiffRunsPageComponent, // ← AJOUT
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private service = inject(PerfRunService);

  latest: PerfRun | null = null;
  comparison: PerfRunComparison | null = null;
  history: PerfRun[] = [];
  app = 'my-app';
  scenario = 'default';

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service
      .getLatest(this.app, this.scenario)
      .subscribe((r) => (this.latest = r));
    this.service
      .getComparison(this.app, this.scenario)
      .subscribe((r) => (this.comparison = r));
    this.service
      .getHistory(this.app, this.scenario)
      .subscribe((r) => (this.history = r));
  }

  onSelection(sel: { app: string; scenario: string }) {
    this.app = sel.app;
    this.scenario = sel.scenario;
    this.loadData();
  }
}
