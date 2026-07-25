import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfRunService } from '../../service/perfs-run.service';

@Component({
  selector: 'diff-runs-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diff-runs-page.component.html',
})
export class DiffRunsPageComponent implements OnChanges {
  @Input() app!: string;
  @Input() scenario!: string;

  @Input() runAId: number | null = null;
  @Input() runBId: number | null = null;

  @Input() section: 'summary' | 'metrics' | 'status' | 'score' | 'advanced' =
    'summary';

  runA: any = null;
  runB: any = null;

  metrics: any[] = [];

  constructor(private perfService: PerfRunService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.runAId || !this.runBId) return;

    this.loadRunA();
    this.loadRunB();
  }

  private loadRunA() {
    if (!this.runAId) {
      this.runA = null;
      return;
    }

    this.perfService.getById(String(this.runAId)).subscribe({
      next: (data: any) => {
        this.runA = data;
        this.computeAdvancedMetrics();
      },
      error: () => {
        console.warn(`Impossible de charger Run A (id=${this.runAId})`);
        this.runA = null;
      },
    });
  }

  private loadRunB() {
    if (!this.runBId) {
      this.runB = null;
      return;
    }

    this.perfService.getById(String(this.runBId)).subscribe({
      next: (data: any) => {
        this.runB = data;
        this.computeAdvancedMetrics();
      },
      error: () => {
        console.warn(`Impossible de charger Run B (id=${this.runBId})`);
        this.runB = null;
      },
    });
  }

  private computeAdvancedMetrics() {
    if (!this.runA || !this.runB) return;

    const metricsA = this.runA.parsedMetricsJson || {};
    const metricsB = this.runB.parsedMetricsJson || {};

    const keys = Object.keys(metricsA);

    this.metrics = keys.map((key) => {
      const a = metricsA[key];
      const b = metricsB[key];

      return {
        name: key,
        avgA: a?.avg ?? '-',
        avgB: b?.avg ?? '-',
        minA: a?.min ?? '-',
        minB: b?.min ?? '-',
        maxA: a?.max ?? '-',
        maxB: b?.max ?? '-',
        p95A: a?.p95 ?? '-',
        p95B: b?.p95 ?? '-',
        p99A: a?.p99 ?? '-',
        p99B: b?.p99 ?? '-',
      };
    });
  }
}
