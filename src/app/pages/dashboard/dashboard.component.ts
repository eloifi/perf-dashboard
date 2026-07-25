// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { PerfRun } from 'src/app/model/perf-run';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { DiffRunsPageComponent } from '../diff-runs/diff-runs-page.component';
import { RunSelectorComponent } from '../selector/run-selector/run-selector.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, RunSelectorComponent, DiffRunsPageComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  app = 'way2home';
  scenario = 'default';

  runs: PerfRun[] = [];
  runAId: number | null = null;
  runBId: number | null = null;

  dense = false;
  dark = false;

  baselineId = 1;
  baselineRun: PerfRun | null = null;

  trend: PerfRun[] = []; // historique
  baselineIds = [1, 5, 10];
  baselines: PerfRun[] = [];

  constructor(private perfService: PerfRunService) {}

  ngOnInit() {
    this.loadRunsList();
    this.loadBaseline();
    this.loadMultiBaseline();
    this.loadTrend();
    this.autoDark();
  }

  autoDark() {
    const hour = new Date().getHours();
    this.dark = hour >= 19 || hour < 7;
  }

  loadRunsList() {
    this.perfService.getRuns(this.app, this.scenario).subscribe((runs) => {
      this.runs = runs;
      if (runs.length > 0) {
        this.runAId = runs[0].id;
        this.runBId = runs.length > 1 ? runs[1].id : runs[0].id;
      }
    });
  }

  loadBaseline() {
    this.perfService
      .getById(String(this.baselineId))
      .subscribe((r) => (this.baselineRun = r));
  }
  loadMultiBaseline() {
    this.baselineIds.forEach((id) => {
      this.perfService
        .getById(String(id))
        .subscribe((r) => this.baselines.push(r));
    });
  }
  loadTrend() {
    this.perfService.getRuns(this.app, this.scenario).subscribe((runs) => {
      this.trend = runs.slice(0, 10); // historique des 10 derniers runs
    });
  }

  onSelectionChange(sel: { runAId: number | null; runBId: number | null }) {
    this.runAId = sel.runAId;
    this.runBId = sel.runBId;
  }
}
