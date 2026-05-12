import { Component, Input } from '@angular/core';
import * as Diff from 'diff';

@Component({
  selector: 'app-json-diff-viewer',
  standalone: true,
  template: ` <pre [innerHTML]="diffHtml"></pre> `,
  styles: [
    `
      .added {
        background: #e8f8f5;
        color: #27ae60;
      }
      .removed {
        background: #fdedec;
        color: #c0392b;
      }
    `,
  ],
})
export class JsonDiffViewerComponent {
  @Input() set leftJson(value: string) {
    this.left = value;
    this.computeDiff();
  }
  @Input() set rightJson(value: string) {
    this.right = value;
    this.computeDiff();
  }

  left = '';
  right = '';
  diffHtml = '';

  computeDiff() {
    if (!this.left || !this.right) return;

    const diff = Diff.diffJson(JSON.parse(this.left), JSON.parse(this.right));

    this.diffHtml = diff
      .map((part) => {
        const cls = part.added ? 'added' : part.removed ? 'removed' : '';
        return `<span class="${cls}">${part.value}</span>`;
      })
      .join('');
  }
}
