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
  selector: 'app-p95-chart',
  standalone: true,
  imports: [CommonModule],
  template: ` <canvas #chartCanvas></canvas> `,
})
export class P95ChartComponent implements OnChanges {
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
            label: 'P95 (ms)',
            data: this.runs.map((r) => r.p95),
            borderColor: '#3498db',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
