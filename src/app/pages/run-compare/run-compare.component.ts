import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { AppStore } from 'src/app/service/app.store';

@Component({
  standalone: true,
  selector: 'app-run-compare',
  imports: [CommonModule],
  template: `
    <h2>Comparateur de runs</h2>

    <ng-container *ngIf="data">
      <p>
        <strong>Current:</strong> #{{ data.currentId }} — p95:
        {{ data.currentP95 }} ms — erreurs: {{ data.currentHttpReqFailed }} —
        score: {{ data.currentGlobalScore }}
      </p>
      <p>
        <strong>Previous:</strong> #{{ data.previousId }} — p95:
        {{ data.previousP95 }} ms — erreurs: {{ data.previousHttpReqFailed }} —
        score: {{ data.previousGlobalScore }}
      </p>

      <table>
        <tr>
          <th>Métrique</th>
          <th>Δ</th>
        </tr>
        <tr>
          <td>p95</td>
          <td [ngClass]="deltaClass(data.deltaP95)">
            {{ data.deltaP95 | number: '1.0-2' }} ms
          </td>
        </tr>
        <tr>
          <td>Erreurs</td>
          <td [ngClass]="deltaClass(-data.deltaHttpReqFailed)">
            {{ data.deltaHttpReqFailed | number: '1.0-2' }}
          </td>
        </tr>
        <tr>
          <td>Score</td>
          <td [ngClass]="deltaClass(-data.deltaGlobalScore)">
            {{ data.deltaGlobalScore | number: '1.0-2' }}
          </td>
        </tr>
      </table>

      <p>
        Statut :
        <span [ngClass]="statusClass(data.status)">
          {{ data.status }}
        </span>
      </p>
    </ng-container>
  `,
  styles: [
    `
      .improved {
        color: #43a047;
        font-weight: bold;
      }
      .degraded {
        color: #e53935;
        font-weight: bold;
      }
      .stable {
        color: #fb8c00;
        font-weight: bold;
      }
      td.positive {
        color: #43a047;
      }
      td.negative {
        color: #e53935;
      }
    `,
  ],
})
export class RunCompareComponent {
  data: any;

  constructor(
    private api: PerfRunService,
    private appStore: AppStore,
  ) {
    effect(() => {
      const app = this.appStore.app();
      if (!app) return;

      this.api.getLatestComparison(app, 'smoke').subscribe((d) => {
        this.data = d;
      });
    });
  }

  deltaClass(delta: number) {
    if (delta < 0) return 'positive';
    if (delta > 0) return 'negative';
    return '';
  }

  statusClass(status: string) {
    if (status === 'IMPROVED') return 'improved';
    if (status === 'DEGRADED') return 'degraded';
    return 'stable';
  }
}
