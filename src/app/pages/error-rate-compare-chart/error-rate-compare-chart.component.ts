import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { PerfRun } from 'src/app/model/perf-run';
@Component({
  selector: 'app-error-rate-compare-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #chartCanvas></canvas>`,
})
export class ErrorRateCompareChartComponent implements OnChanges {
  @Input() runA!: PerfRun;
  @Input() runB!: PerfRun;

  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngOnChanges() {
    if (!this.canvas || !this.runA || !this.runB) return;

    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Run A', 'Run B'],
        datasets: [
          {
            label: 'Error rate (%)',
            data: [
              this.runA.httpReqFailed * 100,
              this.runB.httpReqFailed * 100,
            ],
            backgroundColor: ['#e74c3c', '#9b59b6'],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
}
