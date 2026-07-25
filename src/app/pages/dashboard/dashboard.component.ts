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
  runA: any = null;
  runB: any = null;

  constructor(private perfService: PerfRunService) {}

  ngOnInit() {
    this.loadRunsList();
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

  onSelectionChange(selection: {
    runAId: number | null;
    runBId: number | null;
  }) {
    this.runAId = selection.runAId;
    this.runBId = selection.runBId;
  }
}
