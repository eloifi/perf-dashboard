import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';
import { PerfRun } from 'src/app/model/perf-run';

@Component({
  selector: 'app-status-diff-visual',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent],
  template: `
    <div class="status-container" *ngIf="runA && runB">
      <h3>Comparaison du Status</h3>

      <div class="status-row">
        <div class="status-block">
          <div class="label">Run A</div>
          <app-status-badge [status]="runA.status"></app-status-badge>
        </div>

        <div class="status-block">
          <div class="label">Run B</div>
          <app-status-badge [status]="runB.status"></app-status-badge>
        </div>
      </div>

      <div class="diff">
        <div class="diff-bar" [ngClass]="trendClass">
          <span class="diff-value">
            {{ trendLabel }}
            <span class="arrow">{{ arrow }}</span>
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .status-container {
        margin-top: 20px;
        padding: 15px;
        border-radius: 8px;
        background: #fafafa;
        border: 1px solid #ddd;
      }

      .status-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
      }

      .status-block {
        text-align: center;
        width: 45%;
      }

      .label {
        font-size: 14px;
        color: #666;
        margin-bottom: 4px;
      }

      .diff {
        margin-top: 10px;
      }

      .diff-bar {
        padding: 10px;
        border-radius: 6px;
        text-align: center;
        font-weight: bold;
        color: white;
      }

      .better {
        background: #2ecc71;
      }

      .worse {
        background: #e74c3c;
      }

      .same {
        background: #95a5a6;
      }

      .arrow {
        margin-left: 6px;
      }
    `,
  ],
})
export class StatusDiffVisualComponent {
  @Input() runA!: PerfRun;
  @Input() runB!: PerfRun;

  private order = ['OK', 'WARN', 'CRITICAL'];

  get trend(): number {
    return (
      this.order.indexOf(this.runB.status) -
      this.order.indexOf(this.runA.status)
    );
  }

  get trendClass(): string {
    if (this.trend < 0) return 'better';
    if (this.trend > 0) return 'worse';
    return 'same';
  }

  get arrow(): string {
    if (this.trend < 0) return '⬆️';
    if (this.trend > 0) return '⬇️';
    return '➖';
  }

  get trendLabel(): string {
    if (this.trend < 0) return 'Amélioration';
    if (this.trend > 0) return 'Dégradation';
    return 'Identique';
  }
}
