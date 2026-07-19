import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PerfRun } from '../../model/perf-run';
import { PerfRunComparison } from '../../model/perf-run-comparison.model';
import { PerfRunService } from '../../service/perfs-run.service';
import { RunCardComponent } from '../../shared/components/run-card/run-card.component';
import { ComparisonCardComponent } from '../../shared/components/comparison-card/comparison-card.component';
import { HistoryChartComponent } from '../../shared/components/history-chart/history-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RunCardComponent,
    ComparisonCardComponent,
    HistoryChartComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private service = inject(PerfRunService);

  latest: PerfRun | null = null;
  comparison: PerfRunComparison | null = null;
  history: PerfRun[] = [];

  ngOnInit(): void {
    const app = 'my-app';
    const scenario = 'default';

    this.service.getLatest(app, scenario).subscribe((r) => (this.latest = r));
    this.service
      .getComparison(app, scenario)
      .subscribe((r) => (this.comparison = r));
    this.service.getHistory(app, scenario).subscribe((r) => (this.history = r));
  }
}
