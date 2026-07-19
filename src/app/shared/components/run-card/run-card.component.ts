import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../../../components/status-badge/status-badge.component';
import { PerfRun } from '../../../model/perf-run';

@Component({
  selector: 'app-run-card',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  templateUrl: './run-card.component.html',
})
export class RunCardComponent {
  run!: PerfRun;
}
