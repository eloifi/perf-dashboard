import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RunService, Run } from '../../service/run.service';
import { AppStore } from 'src/app/service/app.store';

@Component({
  standalone: true,
  selector: 'app-run-details',
  imports: [CommonModule],
  template: `
    <h2>Détails du run</h2>

    <ng-container *ngIf="run">
      <p><strong>ID:</strong> {{ run.id }}</p>
      <p><strong>Application:</strong> {{ run.application }}</p>
      <p><strong>Date:</strong> {{ run.date }}</p>
      <p><strong>p95:</strong> {{ run.p95 }} ms</p>
      <p><strong>p99:</strong> {{ run.p99 }} ms</p>
      <p><strong>Erreurs:</strong> {{ run.http_req_failed }}</p>
    </ng-container>
  `,
})
export class RunDetailsPage {
  run?: Run;

  constructor(
    private route: ActivatedRoute,
    private runService: RunService,
    private appStore: AppStore,
  ) {
    const id = this.route.snapshot.paramMap.get('id')!;

    effect(() => {
      const app = this.appStore.app();
      if (!app) return;

      this.runService.getRun(id, app).subscribe((run) => {
        this.run = run;
      });
    });
  }
}
