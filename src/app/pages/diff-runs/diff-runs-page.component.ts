import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfRunService } from '../../service/perfs-run.service';
import { PerfRun } from '../../model/perf-run';
import { StatusBadgeComponent } from 'src/app/components/status-badge/status-badge.component';
import { ScoreCompareChartComponent } from '../score-compare-chart/score-compare-chart.component';
import { ScoreDiffVisualComponent } from '../score-diff-visual/score-diff-visual.component';
import { StatusDiffVisualComponent } from '../status-diff-visual/status-diff-visual.component';

@Component({
  selector: 'app-diff-runs-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StatusBadgeComponent,
    ScoreCompareChartComponent,
    StatusDiffVisualComponent,
    ScoreDiffVisualComponent,
  ],
  templateUrl: './diff-runs-page.component.html',
})
export class DiffRunsPageComponent {
  private service = inject(PerfRunService);

  runAId = '';
  runBId = '';
  runA: PerfRun | null = null;
  runB: PerfRun | null = null;

  showAdvanced = false;

  loadRuns(): void {
    if (this.runAId) {
      this.service.getById(this.runAId).subscribe((r) => (this.runA = r));
    }
    if (this.runBId) {
      this.service.getById(this.runBId).subscribe((r) => (this.runB = r));
    }
  }

  sortedMetricKeys(): string[] {
    if (!this.runA?.parsedMetrics) return [];
    return Object.keys(this.runA.parsedMetrics).sort();
  }

  heatmapClass(value: number | undefined, metric: string): string {
    if (value === undefined) return '';
    if (metric === 'avg' || metric === 'min' || metric === 'max') {
      return value > 0 ? 'bg-red-200' : 'bg-green-200';
    }
    return '';
  }

  deltaClass(a: number, b: number): string {
    const d = b - a;
    return d > 0 ? 'text-red-600' : 'text-green-600';
  }

  diff(a: number, b: number): number {
    return b - a;
  }

  deltaArrow(a: number, b: number): string {
    const d = b - a;
    return d > 0 ? '↑' : '↓';
  }

  exportTechCSV(): void {
    console.log('TODO: export CSV');
  }
}
