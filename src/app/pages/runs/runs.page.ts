import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RunService, Run } from '../../service/run.service';
import { AppStore } from 'src/app/service/app.store';

@Component({
  standalone: true,
  selector: 'app-runs',
  imports: [CommonModule, RouterLink],
  template: `
    <h2>Runs</h2>

    <ul>
      <li *ngFor="let r of runs">
        <a [routerLink]="['/runs', r.id]">
          {{ r.application }} — {{ r.date }} — p95: {{ r.p95 }}ms
        </a>
      </li>
    </ul>
  `,
})
export class RunsPage {
  runs: Run[] = [];

  constructor(
    private runService: RunService,
    private appStore: AppStore,
  ) {
    effect(() => {
      const app = this.appStore.app();
      if (!app) return;

      this.runService.getRunIds(app).subscribe((ids) => {
        this.runs = [];
        ids.forEach((id) => {
          this.runService.getRun(id, app).subscribe((run) => {
            this.runs.push(run);
          });
        });
      });
    });
  }
}
