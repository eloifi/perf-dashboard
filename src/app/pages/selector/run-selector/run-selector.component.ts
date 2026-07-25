// src/app/pages/run-selector/run-selector.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { PerfRun } from 'src/app/model/perf-run';

@Component({
  selector: 'run-selector',
  standalone: true,
  imports: [NgFor],
  templateUrl: './run-selector.component.html',
})
export class RunSelectorComponent {
  @Input() runs: PerfRun[] = [];
  @Input() runAId: number | null = null;
  @Input() runBId: number | null = null;

  @Output() selection = new EventEmitter<{
    runAId: number | null;
    runBId: number | null;
  }>();

  onRunAChange(value: string) {
    this.runAId = value ? Number(value) : null;
    this.emitSelection();
  }

  onRunBChange(value: string) {
    this.runBId = value ? Number(value) : null;
    this.emitSelection();
  }

  emitSelection() {
    this.selection.emit({
      runAId: this.runAId,
      runBId: this.runBId,
    });
  }
}
