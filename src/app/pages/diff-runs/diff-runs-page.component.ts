import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

// SERVICE CORRECT
import { PerfRunService } from '../../service/perfs-run.service';

// COMPOSANTS CORRECTS SELON TON ARBORESCENCE
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';
import { ScoreCompareChartComponent } from '../score-compare-chart/score-compare-chart.component';
import { StatusDiffVisualComponent } from '../status-diff-visual/status-diff-visual.component';
import { ScoreDiffVisualComponent } from '../score-diff-visual/score-diff-visual.component';

@Component({
  selector: 'diff-runs-page',
  standalone: true,
  imports: [
    CommonModule,
    StatusBadgeComponent,
    ScoreCompareChartComponent,
    StatusDiffVisualComponent,
    ScoreDiffVisualComponent,
  ],
  templateUrl: './diff-runs-page.component.html',
})
export class DiffRunsPageComponent implements OnChanges {
  @Input() app!: string;
  @Input() scenario!: string;

  @Input() runAId: number | null = null;
  @Input() runBId: number | null = null;

  runA: any;
  runB: any;
  history: any[] = [];
  showAdvanced = false;

  constructor(private service: PerfRunService) {}

  ngOnChanges() {
    if (!this.runAId || !this.runBId) return;
    this.loadData();
  }

  loadData() {
    this.service.getLatest(this.app, this.scenario).subscribe((r: any) => {
      this.runA = r;
    });

    this.service.getComparison(this.app, this.scenario).subscribe((r: any) => {
      this.runB = r.runB;
    });

    this.service.getHistory(this.app, this.scenario).subscribe((h: any[]) => {
      this.history = h;
    });
  }

  diff(a: number, b: number) {
    return a - b;
  }

  deltaArrow(a: number, b: number) {
    const d = a - b;
    if (d > 0) return '↑';
    if (d < 0) return '↓';
    return '→';
  }

  deltaClass(a: number, b: number) {
    const d = a - b;
    if (d > 0) return 'text-red-600';
    if (d < 0) return 'text-green-600';
    return 'text-gray-500';
  }

  heatmapClass(value: number, metric: string) {
    if (metric === 'avg') {
      if (value > 300) return 'bg-red-300';
      if (value > 150) return 'bg-orange-300';
      if (value > 80) return 'bg-yellow-300';
      return 'bg-green-300';
    }

    if (metric === 'min') {
      if (value > 200) return 'bg-red-300';
      if (value > 100) return 'bg-orange-300';
      if (value > 50) return 'bg-yellow-300';
      return 'bg-green-300';
    }

    if (metric === 'max') {
      if (value > 500) return 'bg-red-300';
      if (value > 300) return 'bg-orange-300';
      if (value > 150) return 'bg-yellow-300';
      return 'bg-green-300';
    }

    if (metric === 'p(95)' || metric === 'p(99)') {
      if (value > 400) return 'bg-red-300';
      if (value > 200) return 'bg-orange-300';
      if (value > 100) return 'bg-yellow-300';
      return 'bg-green-300';
    }

    return 'bg-gray-200';
  }

  sortedMetricKeys() {
    if (!this.runA?.parsedMetrics) return [];
    return Object.keys(this.runA.parsedMetrics).sort();
  }

  exportTechCSV() {
    console.log('TODO: export CSV');
  }
}
