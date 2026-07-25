import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { PerfRun } from 'src/app/model/perf-run';
import { PerfRunService } from 'src/app/service/perfs-run.service';

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
  @Input() trend: PerfRun[] = []; // historique p95/p99
  @Input() section:
    | 'summary'
    | 'metrics'
    | 'status'
    | 'score'
    | 'advanced'
    | 'trend' = 'summary';

  runA: PerfRun | null = null;
  runB: PerfRun | null = null;
  @Input() baselines: PerfRun[] = [];

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

  // DELTAS
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

  // BASELINE
  get deltaP95Baseline(): number | null {
    if (!this.runA || !this.baseline) return null;
    return this.runA.p95 - this.baseline.p95;
  }

  // SCORE BADGES
  private getScoreBadge(score: number): string {
    if (score >= 90) return 'A';
    if (score >= 75) return 'B';
    if (score >= 50) return 'C';
    return 'D';
  }

  private getScoreColor(score: number): string {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
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

  // MINI-GRAPH p95/p99
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

  // TREND GRAPH (historique p95/p99)
  get trendP95(): number[] {
    return this.trend.map((r) => r.p95);
  }

  get trendP99(): number[] {
    return this.trend.map((r) => r.p99);
  }

  get multiBaselineDelta(): { id: number; delta: number }[] {
    if (!this.runA || !this.baselines.length) return [];
    return this.baselines.map((b) => ({
      id: Number(b.id),
      delta: this.runA!.p95 - b.p95,
    }));
  }
}
