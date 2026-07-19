import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfRunComparison } from '../../../model/perf-run-comparison.model';

@Component({
  selector: 'app-comparison-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparison-card.component.html',
})
export class ComparisonCardComponent {
  comparison!: PerfRunComparison;
}
