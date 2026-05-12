// src/app/pages/diff/json-diff-viewer/json-diff-viewer.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-json-diff-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './json-diff-viewer.component.html',
  styleUrls: ['./json-diff-viewer.component.scss'],
})
export class JsonDiffViewerComponent {
  @Input() oldJson: any;
  @Input() newJson: any;

  getDiff(): any[] {
    return this.diffObjects(this.oldJson, this.newJson);
  }

  private diffObjects(oldObj: any, newObj: any, path: string = ''): any[] {
    const diffs: any[] = [];

    const allKeys = new Set([
      ...Object.keys(oldObj || {}),
      ...Object.keys(newObj || {}),
    ]);

    for (const key of allKeys) {
      const oldVal = oldObj ? oldObj[key] : undefined;
      const newVal = newObj ? newObj[key] : undefined;
      const currentPath = path ? `${path}.${key}` : key;

      // Ajouté
      if (oldVal === undefined && newVal !== undefined) {
        diffs.push({
          type: 'added',
          path: currentPath,
          oldValue: undefined,
          newValue: newVal,
        });
        continue;
      }

      // Supprimé
      if (oldVal !== undefined && newVal === undefined) {
        diffs.push({
          type: 'removed',
          path: currentPath,
          oldValue: oldVal,
          newValue: undefined,
        });
        continue;
      }

      // Modifié (valeur primitive)
      if (this.isPrimitive(oldVal) && this.isPrimitive(newVal)) {
        if (oldVal !== newVal) {
          diffs.push({
            type: 'modified',
            path: currentPath,
            oldValue: oldVal,
            newValue: newVal,
          });
        }
        continue;
      }

      // Objet ou tableau → récursion
      if (typeof oldVal === 'object' && typeof newVal === 'object') {
        diffs.push(...this.diffObjects(oldVal, newVal, currentPath));
      }
    }

    return diffs;
  }

  private isPrimitive(value: any): boolean {
    return (
      value === null || ['string', 'number', 'boolean'].includes(typeof value)
    );
  }
}
