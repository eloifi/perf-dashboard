import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex gap-4 p-4">
      <select
        class="border p-2 rounded"
        [(ngModel)]="selectedApp"
        (change)="emitSelection()"
      >
        <option *ngFor="let app of apps" [value]="app">{{ app }}</option>
      </select>

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
  apps = ['my-app', 'way2home', 'perfs-api'];
  scenarios = ['default', 'load', 'baseline'];

  selectedApp = 'my-app';
  selectedScenario = 'default';

  @Output() selection = new EventEmitter<{ app: string; scenario: string }>();

  emitSelection() {
    this.selection.emit({
      app: this.selectedApp,
      scenario: this.selectedScenario,
    });
  }
}
