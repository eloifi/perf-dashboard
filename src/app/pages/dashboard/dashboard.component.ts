import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiffRunsPageComponent } from '../diff-runs/diff-runs-page.component';
import { AppSelectorComponent } from '../app-selector/app-selector.component';
import { RunSelectorComponent } from '../run-selector/run-selector.component';

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AppSelectorComponent,
    RunSelectorComponent,
    DiffRunsPageComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  dense: boolean = false;

  app: string = '';
  scenario: string = '';

  runAId: number | null = null;
  runBId: number | null = null;

  onAppScenario(sel: { app: string; scenario: string }) {
    this.app = sel.app;
    this.scenario = sel.scenario;
  }

  onRunSelection(sel: { runA: number | null; runB: number | null }) {
    if (!sel.runA || !sel.runB) return;
    this.runAId = sel.runA;
    this.runBId = sel.runB;
  }
}
