import { CommonModule } from '@angular/common';
import {
  Component,
  OnChanges,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Chart } from 'chart.js';
import { PerfRun } from 'src/app/model/perf-run';

@Component({
  selector: 'app-p95-compare-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #chartCanvas></canvas>`,
})
export class P95CompareChartComponent implements OnChanges {
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
            label: 'P95 (ms)',
            data: [this.runA.p95, this.runB.p95],
            backgroundColor: ['#3498db', '#9b59b6'],
          },
        ],
      },
      options: { responsive: true },
    });
  }
}
