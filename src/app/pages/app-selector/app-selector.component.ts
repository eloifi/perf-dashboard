import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfRunService } from '../../service/perfs-run.service';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex gap-4 p-4">
      <!-- Sélecteur d'application dynamique -->
      <select
        class="border p-2 rounded"
        [(ngModel)]="selectedApp"
        (change)="onAppChange()"
      >
        <option *ngFor="let app of apps" [value]="app">{{ app }}</option>
      </select>

      <!-- Sélecteur de scénario dynamique -->
      <select
        class="border p-2 rounded"
        [(ngModel)]="selectedScenario"
        (change)="emitSelection()"
      >
        <option *ngFor="let s of scenarios" [value]="s">{{ s }}</option>
      </select>
    </div>
  `,
})
export class AppSelectorComponent {
  apps: string[] = [];
  scenarios: string[] = [];

  selectedApp = '';
  selectedScenario = '';

  @Output() selection = new EventEmitter<{ app: string; scenario: string }>();

  constructor(private service: PerfRunService) {}

  ngOnInit() {
    this.loadApps();
  }

  loadApps() {
    this.service.getApps().subscribe((list) => {
      this.apps = list;

      // Choisir la première app automatiquement
      this.selectedApp = list[0];

      this.loadScenarios();
    });
  }

  onAppChange() {
    this.loadScenarios();
  }

  loadScenarios() {
    this.service.getScenarios(this.selectedApp).subscribe((list) => {
      this.scenarios = list;

      // Choisir le premier scénario automatiquement
      this.selectedScenario = list[0];

      this.emitSelection();
    });
  }

  emitSelection() {
    this.selection.emit({
      app: this.selectedApp,
      scenario: this.selectedScenario,
    });
  }
}
