// src/app/shared/components/history-chart/history-chart.component.ts
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

  get data() {
    return this.history.map((h) => {
      switch (this.chartType) {
        case 'p95':
          return h.p95;
        case 'error':
          return h.errorRate;
        case 'score':
          return h.globalScore;
      }
    });
  }
}
