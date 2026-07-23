// src/app/shared/components/comparison-card/comparison-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfRunComparison } from '../../../model/perf-run-comparison.model';

@Component({
  selector: 'app-comparison-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparison-card.component.html',
})
export class ComparisonCardComponent {
  @Input() comparison!: PerfRunComparison;
}
