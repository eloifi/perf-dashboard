import { Component, ElementRef, ViewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';
import { RunService } from '../../service/run.service';
import { AppStore } from 'src/app/service/app.store';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
);

@Component({
  standalone: true,
  selector: 'app-graphs',
  imports: [CommonModule],
  template: `
    <h2>Graphiques de performance</h2>
    <canvas #chartCanvas></canvas>
  `,
})
export class GraphsPage {
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  chart?: Chart;

  constructor(
    private runService: RunService,
    private appStore: AppStore,
  ) {
    effect(() => {
      const app = this.appStore.app();
      if (!app) return;

      queueMicrotask(() => {
        if (!this.canvasRef) return;

        this.runService.getRunIds(app).subscribe((ids) => {
          const runs: any[] = [];
          ids.forEach((id) => {
            this.runService.getRun(id, app).subscribe((run) => {
              runs.push(run);

              if (runs.length === ids.length) {
                this.renderChart(runs);
              }
            });
          });
        });
      });
    });
  }

  renderChart(runs: any[]) {
    const ctx = this.canvasRef.nativeElement.getContext('2d')!;
    if (this.chart) this.chart.destroy();

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: runs.map((r) => r.date),
        datasets: [
          {
            label: 'p95 (ms)',
            data: runs.map((r) => r.p95),
            borderColor: 'rgb(63,81,181)',
            backgroundColor: 'rgba(63,81,181,0.2)',
            tension: 0.3,
          },
        ],
      },
    });
  }
}
