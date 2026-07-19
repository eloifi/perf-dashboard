import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PerfRun } from '../../../model/perf-run';

type ChartType = 'p95' | 'error' | 'score';

@Component({
  selector: 'app-history-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-chart.component.html',
})
export class HistoryChartComponent {
  @Input() history: PerfRun[] = [];
  @Input() chartType: ChartType = 'p95';

  get data(): number[] {
    return this.history.map((h) => {
      switch (this.chartType) {
        case 'p95':
          return h.p95;
        case 'error':
          return h.error;
        case 'score':
          return h.score;
      }
    });
  }

  get labels(): string[] {
    return this.history.map((h) => h.timestamp);
  }
}
