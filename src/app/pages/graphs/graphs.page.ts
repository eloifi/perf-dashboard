import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { AppStore } from 'src/app/service/app.store';

@Component({
  standalone: true,
  selector: 'app-graphs',
  imports: [CommonModule],
  template: `
    <h2>Graphiques de performance</h2>
    <canvas #chartCanvas></canvas>
  `,
})
export class GraphsPage implements AfterViewInit {
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  chart?: Chart;

  constructor(
    private api: PerfRunService,
    private appStore: AppStore,
  ) {}

  ngAfterViewInit() {
    effect(() => {
      const app = this.appStore.app();
      if (!app) return;

      this.api.getHistory(app, 'smoke').subscribe((runs) => {
        if (!runs.length) return;

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
      });
    });
  }
}
