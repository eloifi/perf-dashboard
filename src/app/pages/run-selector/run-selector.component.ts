import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfRunService } from '../../service/perfs-run.service';

@Component({
  selector: 'run-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './run-selector.component.html',
})
export class RunSelectorComponent {
  @Input() app!: string;
  @Input() scenario!: string;

  @Output() selection = new EventEmitter<{
    runA: number | null;
    runB: number | null;
  }>();

  runs: any[] = [];

  selectedRunA: number | null = null;
  selectedRunB: number | null = null;

  constructor(private service: PerfRunService) {}

  ngOnChanges() {
    if (!this.app || !this.scenario) return;

    this.service.getRuns(this.app, this.scenario).subscribe((list) => {
      if (!list || list.length === 0) {
        console.warn(`Fallback: aucun run pour ${this.app}/${this.scenario}`);
        this.selection.emit({ runA: null, runB: null });
        return;
      }

      // Tri du plus récent au plus ancien
      this.runs = list.sort((a, b) => b.id - a.id);

      // Sélection automatique
      this.selectedRunA = Number(this.runs[0].id);
      this.selectedRunB = Number(this.runs[1]?.id ?? this.runs[0].id);

      this.emitSelection();
    });
  }

  onRunAChange(value: any) {
    this.selectedRunA = Number(value);
    this.emitSelection();
  }

  onRunBChange(value: any) {
    this.selectedRunB = Number(value);
    this.emitSelection();
  }

  emitSelection() {
    this.selection.emit({
      runA: this.selectedRunA,
      runB: this.selectedRunB,
    });
  }
}
