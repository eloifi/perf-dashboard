import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusBadgeComponent } from 'src/app/  components/status-badge/status-badge.component';
import { PerfRun } from 'src/app/model/perf-run';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { JsonDiffViewerComponent } from '../jsondiff-viewer/jsondiff-viewer.component';
import { ErrorRateCompareChartComponent } from '../error-rate-compare-chart/error-rate-compare-chart.component';
import { ScoreCompareChartComponent } from '../score-compare-chart/score-compare-chart.component';
import { StatusDiffVisualComponent } from '../status-diff-visual/status-diff-visual.component';
import { ScoreDiffVisualComponent } from '../score-diff-visual/score-diff-visual.component';
import { P95CompareChartComponent } from '../p95-compare-chart/p95-compare-chart.component';

@Component({
  selector: 'app-diff-runs',
  standalone: true,
  imports: [
    CommonModule, // <-- *ngIf, *ngFor, date, number, ngClass
    FormsModule, // <-- ngModel
    ErrorRateCompareChartComponent,
    ScoreCompareChartComponent,
    StatusDiffVisualComponent,
    ScoreDiffVisualComponent,
    JsonDiffViewerComponent,
    StatusBadgeComponent,
    P95CompareChartComponent,
  ],
  templateUrl: './diff-runs-page.component.html',
  styleUrls: ['./diff-runs-page.component.scss'],
})
export class DiffRunsPageComponent implements OnInit {
  history: PerfRun[] = [];
  runAId!: number;
  runBId!: number;

  runA: PerfRun | null = null;
  runB: PerfRun | null = null;
  showAdvanced = false;

  constructor(private service: PerfRunService) {}

  ngOnInit() {
    this.service.getHistory('way2home-search', 'load').subscribe((h) => {
      console.log('History loaded:', h);
      this.history = h;

      if (h.length >= 2) {
        this.runAId = h[h.length - 2].id;
        this.runBId = h[h.length - 1].id;
      } else if (h.length === 1) {
        this.runAId = h[0].id;
        this.runBId = h[0].id;
      } else {
        return;
      }

      console.log('runAId:', this.runAId);
      console.log('runBId:', this.runBId);

      this.loadRunA();
      this.loadRunB();
    });
  }

  loadRunA() {
    console.log('loadRunA called with id:', this.runAId);
    this.service.getById(this.runAId).subscribe((r) => {
      console.log('runA loaded:', r);
      this.runA = r;
    });
  }

  loadRunB() {
    console.log('loadRunB called with id:', this.runBId);
    this.service.getById(this.runBId).subscribe((r) => {
      console.log('runB loaded:', r);
      this.runB = r;
    });
  }

  metricKeys(m: any): string[] {
    return Object.keys(m).filter((k) => m[k]?.values);
  }

  diff(a: number | undefined, b: number | undefined): string {
    if (a == null || b == null) return '—';
    const d = b - a;
    return d === 0 ? '0' : d.toFixed(3);
  }

  deltaClass(a: number | undefined, b: number | undefined): string {
    if (a == null || b == null) return 'delta-neutral';

    const d = b - a;

    if (d === 0) return 'delta-neutral';
    if (d < 0) return 'delta-good'; // Run B est meilleur
    return 'delta-bad'; // Run B est pire
  }

  deltaArrow(a: number | undefined, b: number | undefined): string {
    if (a == null || b == null) return '→'; // neutre

    const d = b - a;

    if (d === 0) return '→'; // égal
    if (d < 0) return '↓'; // Run B est meilleur (moins de temps)
    return '↑'; // Run B est pire (plus de temps)
  }

  sortedMetricKeys(): string[] {
    const keys = this.metricKeys(this.runA?.parsedMetrics);

    return keys.sort((k1, k2) => {
      const a1 = this.runA?.parsedMetrics[k1]?.values?.['p(95)'];
      const b1 = this.runB?.parsedMetrics[k1]?.values?.['p(95)'];
      const d1 = (b1 ?? 0) - (a1 ?? 0);

      const a2 = this.runA?.parsedMetrics[k2]?.values?.['p(95)'];
      const b2 = this.runB?.parsedMetrics[k2]?.values?.['p(95)'];
      const d2 = (b2 ?? 0) - (a2 ?? 0);

      return d2 - d1; // pire → meilleur
    });
  }

  exportTechCSV() {
    const rows = [];
    rows.push([
      'metric',
      'avgA',
      'avgB',
      'minA',
      'minB',
      'maxA',
      'maxB',
      'p95A',
      'p95B',
      'p99A',
      'p99B',
      'deltaP95',
    ]);

    for (const key of this.sortedMetricKeys()) {
      const a = this.runA?.parsedMetrics[key]?.values;
      const b = this.runB?.parsedMetrics[key]?.values;

      rows.push([
        key,
        a?.avg ?? '',
        b?.avg ?? '',
        a?.min ?? '',
        b?.min ?? '',
        a?.max ?? '',
        b?.max ?? '',
        a?.['p(95)'] ?? '',
        b?.['p(95)'] ?? '',
        a?.['p(99)'] ?? '',
        b?.['p(99)'] ?? '',
        (b?.['p(95)'] ?? 0) - (a?.['p(95)'] ?? 0),
      ]);
    }

    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'tech-metrics.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}
