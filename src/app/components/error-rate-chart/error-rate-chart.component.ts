import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { PerfRun } from 'src/app/model/perf-run';
@Component({
  selector: 'app-error-rate-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #chartCanvas></canvas>`,
})
export class ErrorRateChartComponent implements OnChanges {
  @Input() runs: PerfRun[] = [];
  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  chart!: Chart;

  ngOnChanges() {
    if (!this.canvas) return;

    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.runs.map((r) => r.date),
        datasets: [
          {
            label: 'Error rate (%)',
            data: this.runs.map((r) => r.httpReqFailed * 100),
            borderColor: '#e74c3c',
            tension: 0.3,
          },
        ],
      },
      options: { responsive: true },
    });
  }
}
