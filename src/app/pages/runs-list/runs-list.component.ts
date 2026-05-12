import { Component, Input } from '@angular/core';
import { StatusBadgeComponent } from '../status-badge/status-badge.component';
import { PerfRun } from 'src/app/model/perf-run';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-runs-list',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  template: `
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>P95</th>
          <th>Error Rate</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let run of runs">
          <td>{{ run.date | date: 'short' }}</td>
          <td>{{ run.p95 }} ms</td>
          <td>{{ run.httpReqFailed * 100 | number: '1.0-2' }}%</td>
          <td><app-status-badge [status]="run.status"></app-status-badge></td>
        </tr>
      </tbody>
    </table>
  `,
})
export class RunsListComponent {
  @Input() runs: PerfRun[] = [];
}
