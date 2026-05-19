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
  styles: [
    `
      .selectors {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
      }
      .compare-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      .compare-table th,
      .compare-table td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
      }
      .positive {
        color: #2ecc71;
        font-weight: bold;
      }
      .negative {
        color: #e74c3c;
        font-weight: bold;
      }
    `,
  ],
})
export class DiffRunsPageComponent implements OnInit {
  history: PerfRun[] = [];
  runAId!: number;
  runBId!: number;

  runA!: PerfRun;
  runB!: PerfRun;

  constructor(private service: PerfRunService) {}

  ngOnInit() {
    this.service.getHistory('way2home-search', 'load').subscribe((h) => {
      this.history = h;

      if (h.length >= 2) {
        this.runAId = h[h.length - 2].id;
        this.runBId = h[h.length - 1].id;
        this.loadRunA();
        this.loadRunB();
      }
    });
  }

  loadRunA() {
    this.service.getById(this.runAId).subscribe((r) => (this.runA = r));
  }

  loadRunB() {
    this.service.getById(this.runBId).subscribe((r) => (this.runB = r));
  }

  diffClass(a: number, b: number) {
    if (b < a) return 'positive';
    if (b > a) return 'negative';
    return '';
  }
}
