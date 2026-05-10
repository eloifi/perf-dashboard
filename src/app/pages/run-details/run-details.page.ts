import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { AppStore } from 'src/app/service/app.store';
import { PerfRun } from 'src/app/model/perf-run';

@Component({
  standalone: true,
  selector: 'app-run-details',
  imports: [CommonModule],
  template: `
    <h2>Détails du run</h2>

    <ng-container *ngIf="run">
      <p><strong>ID:</strong> {{ run.id }}</p>
      <p><strong>Application:</strong> {{ run.app }}</p>
      <p><strong>Scenario:</strong> {{ run.scenario }}</p>
      <p><strong>Date:</strong> {{ run.date }}</p>
      <p><strong>p95:</strong> {{ run.p95 }} ms</p>
      <p><strong>Erreurs:</strong> {{ run.httpReqFailed }}</p>
      <p><strong>Score:</strong> {{ run.globalScore }}</p>

      <h3>Résumé brut</h3>
      <pre>{{ run.rawSummaryJson | json }}</pre>
    </ng-container>
  `,
})
export class RunDetailsPage {
  run?: PerfRun;

  constructor(
    private route: ActivatedRoute,
    private api: PerfRunService,
    private appStore: AppStore,
  ) {
    const id = this.route.snapshot.paramMap.get('id')!;

    effect(() => {
      const app = this.appStore.app();
      if (!app) return;

      this.api.getLatest(app, 'smoke').subscribe((r) => {
        this.run = r;
      });
    });
  }
}
