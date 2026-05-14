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
  selector: 'app-score-compare-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #chartCanvas></canvas>`,
})
export class ScoreCompareChartComponent implements OnChanges {
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
            label: 'Score global',
            data: [this.runA.globalScore, this.runB.globalScore],
            backgroundColor: ['#2ecc71', '#3498db'],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 100 },
        },
      },
    });
  }
}
