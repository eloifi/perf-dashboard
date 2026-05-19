import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { PerfRun } from 'src/app/model/perf-run';
@Component({
  selector: 'app-run-latest',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  template: `
    <ng-container *ngIf="run as r">
      <p>Date : {{ r.date | date: 'short' }}</p>
      <p>P95 : {{ r.p95 }} ms</p>
      <p>Error rate : {{ r.httpReqFailed * 100 | number: '1.0-2' }}%</p>
      <p>
        Status :
        <app-status-badge [status]="r.status"></app-status-badge>
      </p>
    </ng-container>
  `,
})
export class RunLatestComponent {
  @Input() run: PerfRun | null = null;
}
