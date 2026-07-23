import { Component, effect } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PerfRun } from '../../model/perf-run';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { AppStore } from 'src/app/service/app.store';

@Component({
  standalone: true,
  selector: 'app-runs',
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    <h2>Runs</h2>

    <ul>
      <li *ngFor="let r of runs">
        <a [routerLink]="['/runs', r.id]">
          {{ r.app }} — {{ r.scenario }} — {{ r.timestamp | date: 'short' }} —
          p95: {{ r.p95 }}ms
        </a>
      </li>
    </ul>
  `,
})
export class RunsPage {
  runs: PerfRun[] = [];

  constructor(
    private api: PerfRunService,
    private appStore: AppStore,
  ) {
    effect(() => {
      const app = this.appStore.app();
      if (!app) return;

      this.api.getHistory(app, 'smoke').subscribe((r) => {
        this.runs = r;
      });
    });
  }
}
