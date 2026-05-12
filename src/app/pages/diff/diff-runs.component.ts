// src/app/pages/diff/diff-runs.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { PerfRunService } from 'src/app/service/perfs-run.service';
import { JsonDiffViewerComponent } from './json-diff-viewer/json-diff-viewer.component';
import { PerfAlert, AlertsService } from 'src/app/service/alert-service';

@Component({
  selector: 'app-diff-runs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,

    // Custom
    JsonDiffViewerComponent,
  ],
  templateUrl: './diff-runs.component.html',
  styleUrls: ['./diff-runs.component.scss'],
})
export class DiffRunsComponent {
  apps = ['way2home-autocomplete', 'way2home-search', 'way2home-api'];
  scenarios = ['smoke', 'load', 'stress'];

  app = this.apps[0];
  scenario = this.scenarios[0];

  oldId?: number;
  newId?: number;

  diffResult: any;
  loading = false;

  alertsOld: PerfAlert[] = [];
  alertsNew: PerfAlert[] = [];

  constructor(
    private api: PerfRunService,
    private alertsApi: AlertsService,
  ) {}

  compare(): void {
    if (!this.oldId || !this.newId) return;

    this.loading = true;

    this.api
      .getDiff(this.oldId, this.newId, this.app, this.scenario)
      .subscribe({
        next: (res) => {
          this.diffResult = res;
          this.loadAlerts();
          this.loading = false;
        },
        error: () => {
          this.diffResult = null;
          this.loading = false;
        },
      });
  }

  private loadAlerts(): void {
    if (!this.diffResult) return;

    const oldRunId = this.diffResult.old?.id;
    const newRunId = this.diffResult.new?.id;

    if (oldRunId) {
      this.alertsApi.getByRun(oldRunId).subscribe((a) => (this.alertsOld = a));
    }

    if (newRunId) {
      this.alertsApi.getByRun(newRunId).subscribe((a) => (this.alertsNew = a));
    }
  }

  hasDiff(): boolean {
    return !!this.diffResult;
  }

  getLevelClass(level: string): string {
    return level.toLowerCase();
  }
}
