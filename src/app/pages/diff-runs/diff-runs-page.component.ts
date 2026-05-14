import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfRun } from 'src/app/model/perf-run';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { JsonDiffViewerComponent } from '../jsondiff-viewer/jsondiff-viewer.component';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { ErrorRateCompareChartComponent } from '../error-rate-compare-chart/error-rate-compare-chart.component';
import { ScoreDiffVisualComponent } from '../score-diff-visual/score-diff-visual.component';
import { StatusDiffVisualComponent } from '../status-diff-visual/status-diff-visual.component';
import { ScoreCompareChartComponent } from '../score-compare-chart/score-compare-chart.component';

@Component({
  selector: 'app-diff-runs',
  standalone: true,
  imports: [
    CommonModule, // *ngIf, *ngFor, date, number, ngClass
    FormsModule, // ngModel
    StatusBadgeComponent,
    JsonDiffViewerComponent,
    CommonModule,
    ErrorRateCompareChartComponent,
    ScoreDiffVisualComponent,
    StatusDiffVisualComponent,
    ScoreCompareChartComponent,
  ],
  template: `
    <h2>Comparer deux runs</h2>

    <div class="selectors">
      <label>
        Run A :
        <select [(ngModel)]="runAId" (change)="loadRunA()">
          <option *ngFor="let r of history" [value]="r.id">
            {{ r.id }} — {{ r.date | date: 'short' }}
          </option>
        </select>
      </label>

      <label>
        Run B :
        <select [(ngModel)]="runBId" (change)="loadRunB()">
          <option *ngFor="let r of history" [value]="r.id">
            {{ r.id }} — {{ r.date | date: 'short' }}
          </option>
        </select>
      </label>
    </div>

    <table *ngIf="runA && runB" class="compare-table">
      <thead>
        <tr>
          <th>Métrique</th>
          <th>Run A</th>
          <th>Run B</th>
          <th>Diff</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>P95</td>
          <td>{{ runA.p95 }} ms</td>
          <td>{{ runB.p95 }} ms</td>
          <td [ngClass]="diffClass(runA.p95, runB.p95)">
            {{ runB.p95 - runA.p95 | number: '1.0-2' }} ms
          </td>
        </tr>

        <tr>
          <td>Error rate</td>
          <td>{{ runA.httpReqFailed * 100 | number: '1.0-2' }}%</td>
          <td>{{ runB.httpReqFailed * 100 | number: '1.0-2' }}%</td>
          <td [ngClass]="diffClass(runA.httpReqFailed, runB.httpReqFailed)">
            {{
              (runB.httpReqFailed - runA.httpReqFailed) * 100 | number: '1.0-2'
            }}%
          </td>
        </tr>

        <tr>
          <td>Score</td>
          <td>{{ runA.globalScore }}</td>
          <td>{{ runB.globalScore }}</td>
          <td [ngClass]="diffClass(runA.globalScore, runB.globalScore)">
            {{ runB.globalScore - runA.globalScore }}
          </td>
        </tr>

        <tr>
          <td>Status</td>
          <td><app-status-badge [status]="runA.status"></app-status-badge></td>
          <td><app-status-badge [status]="runB.status"></app-status-badge></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <h3>Diff JSON</h3>
    <app-json-diff-viewer
      *ngIf="runA && runB"
      [leftJson]="runA.rawSummaryJson"
      [rightJson]="runB.rawSummaryJson"
    >
      <td>
        <span [ngClass]="trend(runA.p95, runB.p95)">
          {{ runB.p95 - runA.p95 | number: '1.0-2' }} ms
          <span *ngIf="trend(runA.p95, runB.p95) === 'up'">⬆️</span>
          <span *ngIf="trend(runA.p95, runB.p95) === 'down'">⬇️</span>
          <span *ngIf="trend(runA.p95, runB.p95) === 'equal'">➖</span>
        </span>
      </td>
    </app-json-diff-viewer>
    <app-error-rate-compare-chart
      *ngIf="runA && runB"
      [runA]="runA"
      [runB]="runB"
    >
    </app-error-rate-compare-chart>
    <app-score-diff-visual *ngIf="runA && runB" [runA]="runA" [runB]="runB">
    </app-score-diff-visual>
    <app-status-diff-visual *ngIf="runA && runB" [runA]="runA" [runB]="runB">
    </app-status-diff-visual>
    <app-score-compare-chart *ngIf="runA && runB" [runA]="runA" [runB]="runB">
    </app-score-compare-chart>
  `,
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
      .up {
        color: #e74c3c;
        font-weight: bold;
      }
      .down {
        color: #2ecc71;
        font-weight: bold;
      }
      .equal {
        color: #95a5a6;
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

  trend(a: number, b: number): 'up' | 'down' | 'equal' {
    if (b > a) return 'up';
    if (b < a) return 'down';
    return 'equal';
  }
}
