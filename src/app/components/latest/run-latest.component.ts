import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { PerfRun } from 'src/app/model/perf-run';
@Component({
  selector: 'app-run-latest',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  template: `
    <p>Date : {{ run?.date | date: 'short' }}</p>
    <p>Error rate : {{ (run?.httpReqFailed ?? 0) * 100 | number: '1.0-2' }}%</p>
    <p>
      Status :
      <app-status-badge [status]="run?.status ?? 'OK'"></app-status-badge>
    </p>
  `,
})
export class RunLatestComponent {
  @Input() run!: PerfRun;
}
