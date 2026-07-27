import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { PerfRun } from '../../model/perf-run';
import { PerfRunService } from '../../service/perfs-run.service';

@Component({
  selector: 'diff-runs-page',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './diff-runs-page.component.html',
})
export class DiffRunsPageComponent implements OnChanges {
  @Input() runAId: number | null = null;
  @Input() runBId: number | null = null;
  @Input() baseline: PerfRun | null = null;
  @Input() baselines: PerfRun[] = []; // multi-baseline
  @Input() trend: PerfRun[] = []; // historique
  @Input() section: 'summary' | 'metrics' | 'score' | 'trend' = 'summary';

  runA: PerfRun | null = null;
  runB: PerfRun | null = null;

  constructor(private perfService: PerfRunService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!this.runAId || !this.runBId) {
      this.runA = null;
      this.runB = null;
      return;
    }
    this.loadRuns();
  }

  loadRuns() {
    this.perfService
      .getById(String(this.runAId!))
      .subscribe((r) => (this.runA = r));
    this.perfService
      .getById(String(this.runBId!))
      .subscribe((r) => (this.runB = r));
  }

  // deltas
  get deltaP95(): number | null {
    if (!this.runA || !this.runB) return null;
    return this.runA.p95 - this.runB.p95;
  }

  get deltaError(): number | null {
    if (!this.runA || !this.runB) return null;
    return this.runA.errorRate - this.runB.errorRate;
  }

  get deltaScore(): number | null {
    if (!this.runA || !this.runB) return null;
    return this.runA.globalScore - this.runB.globalScore;
  }

  // baseline
  get deltaP95Baseline(): number | null {
    if (!this.runA || !this.baseline) return null;
    return this.runA.p95 - this.baseline.p95;
  }

  // multi-baseline
  get multiBaselineDelta(): { id: number; delta: number }[] {
    if (!this.runA || !this.baselines.length) return [];
    return this.baselines.map((b) => ({
      id: Number(b.id),
      delta: this.runA!.p95 - b.p95,
    }));
  }

  // score badges
  private getScoreBadge(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 75) return 'B';
    if (score >= 50) return 'C';
    return 'D';
  }

  private getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-blue-500';
    if (score >= 50) return 'text-orange-500';
    return 'text-red-500';
  }

  get scoreBadgeA(): string {
    return this.getScoreBadge(this.runA?.globalScore ?? 0);
  }

  get scoreBadgeB(): string {
    return this.getScoreBadge(this.runB?.globalScore ?? 0);
  }

  get scoreColorA(): string {
    return this.getScoreColor(this.runA?.globalScore ?? 0);
  }

  get scoreColorB(): string {
    return this.getScoreColor(this.runB?.globalScore ?? 0);
  }

  // mini-graph p95/p99
  get p95PercentA(): number {
    return Math.min(100, ((this.runA?.p95 ?? 0) / 2000) * 100);
  }

  get p99PercentA(): number {
    return Math.min(100, ((this.runA?.p99 ?? 0) / 2000) * 100);
  }

  get p95PercentB(): number {
    return Math.min(100, ((this.runB?.p95 ?? 0) / 2000) * 100);
  }

  get p99PercentB(): number {
    return Math.min(100, ((this.runB?.p99 ?? 0) / 2000) * 100);
  }

  // trend graph
  get trendP95(): number[] {
    return this.trend.map((r) => r.p95);
  }

  get trendP99(): number[] {
    return this.trend.map((r) => r.p99);
  }
}
