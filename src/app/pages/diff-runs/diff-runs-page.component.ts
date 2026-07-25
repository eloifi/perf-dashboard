// src/app/pages/diff-runs/diff-runs-page.component.ts
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
  @Input() section: 'summary' | 'metrics' | 'status' | 'score' | 'advanced' =
    'summary';

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
    const runA$ = this.perfService.getById(String(this.runAId!));
    const runB$ = this.perfService.getById(String(this.runBId!));

    runA$.subscribe((r) => (this.runA = r));
    runB$.subscribe((r) => (this.runB = r));
  }

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
}
