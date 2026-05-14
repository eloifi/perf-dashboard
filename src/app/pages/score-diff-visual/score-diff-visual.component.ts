import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfRun } from 'src/app/model/perf-run';

@Component({
  selector: 'app-score-diff-visual',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="score-container" *ngIf="runA && runB as r">
      <h3>Comparaison du Score</h3>

      <div class="scores">
        <div class="score-block">
          <div class="label">Run A</div>
          <div class="value">{{ runA.globalScore }}</div>
        </div>

        <div class="score-block">
          <div class="label">Run B</div>
          <div class="value">{{ runB.globalScore }}</div>
        </div>
      </div>

      <div class="diff">
        <div class="diff-bar" [ngClass]="trendClass">
          <span class="diff-value">
            {{ diffValue }}
            <span class="arrow">{{ arrow }}</span>
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .score-container {
        margin-top: 20px;
        padding: 15px;
        border-radius: 8px;
        background: #fafafa;
        border: 1px solid #ddd;
      }

      .scores {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
      }

      .score-block {
        text-align: center;
        width: 45%;
      }

      .label {
        font-size: 14px;
        color: #666;
      }

      .value {
        font-size: 22px;
        font-weight: bold;
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

      .positive {
        background: #2ecc71;
      }

      .negative {
        background: #e74c3c;
      }

      .neutral {
        background: #95a5a6;
      }

      .arrow {
        margin-left: 6px;
      }
    `,
  ],
})
export class ScoreDiffVisualComponent {
  @Input() runA!: PerfRun;
  @Input() runB!: PerfRun;

  get diffValue(): string {
    const diff = this.runB.globalScore - this.runA.globalScore;
    return diff > 0 ? `+${diff}` : `${diff}`;
  }

  get trendClass(): string {
    const diff = this.runB.globalScore - this.runA.globalScore;
    if (diff > 0) return 'positive';
    if (diff < 0) return 'negative';
    return 'neutral';
  }

  get arrow(): string {
    const diff = this.runB.globalScore - this.runA.globalScore;
    if (diff > 0) return '⬆️';
    if (diff < 0) return '⬇️';
    return '➖';
  }
}
