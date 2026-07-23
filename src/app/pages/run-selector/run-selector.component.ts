import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfRunService } from '../../service/perfs-run.service';

@Component({
  selector: 'run-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex gap-4 p-4">
      <!-- Sélecteur Run A -->
      <select
        class="border p-2 rounded"
        [(ngModel)]="selectedRunA"
        (change)="emitSelection()"
      >
        <option *ngFor="let r of runs" [value]="r.id">
          Run A : {{ r.timestamp | date: 'short' }} (score {{ r.globalScore }})
        </option>
      </select>

      <!-- Sélecteur Run B -->
      <select
        class="border p-2 rounded"
        [(ngModel)]="selectedRunB"
        (change)="emitSelection()"
      >
        <option *ngFor="let r of runs" [value]="r.id">
          Run B : {{ r.timestamp | date: 'short' }} (score {{ r.globalScore }})
        </option>
      </select>
    </div>
  `,
})
export class RunSelectorComponent {
  @Input() app!: string;
  @Input() scenario!: string;

  @Output() selection = new EventEmitter<{
    runA: number | null;
    runB: number | null;
  }>();

  runs: any[] = [];
  selectedRunA!: number;
  selectedRunB!: number;

  constructor(private service: PerfRunService) {}

  ngOnChanges() {
    this.loadRuns();
  }

  loadRuns() {
    this.service.getRuns(this.app, this.scenario).subscribe((list) => {
      // Aucun run → fallback scénario
      if (!list || list.length === 0) {
        console.warn(`Fallback: aucun run pour ${this.app}/${this.scenario}`);

        // On demande au parent de changer de scénario
        this.selection.emit({
          runA: null,
          runB: null,
        });

        return;
      }

      this.runs = list;

      // Fallback intelligent
      if (list.length >= 2) {
        // Cas normal : latest + previous
        this.selectedRunA = list[0].id;
        this.selectedRunB = list[1].id;
      } else {
        // Cas spécial : un seul run
        this.selectedRunA = list[0].id;
        this.selectedRunB = list[0].id;
      }

      this.emitSelection();
    });
  }

  emitSelection() {
    this.selection.emit({
      runA: this.selectedRunA,
      runB: this.selectedRunB,
    });
  }
}
