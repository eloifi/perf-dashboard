// src/app/pages/dashboard/components/trend-card/trend-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type Trend = 'up' | 'down' | 'equal';

@Component({
  selector: 'app-trend-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trend-card.component.html',
  styleUrls: ['./trend-card.component.scss'],
})
export class TrendCardComponent {
  @Input() label!: string;
  @Input() value!: number | string;
  @Input() trend?: Trend;

  getTrendIcon(): string {
    if (!this.trend) return '';
    if (this.trend === 'up') return '▲';
    if (this.trend === 'down') return '▼';
    return '■';
  }

  getTrendClass(): string {
    if (!this.trend) return '';
    return this.trend;
  }
}
