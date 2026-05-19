import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule], // <-- obligatoire

  template: `
    <span class="badge" [ngClass]="status.toLowerCase()">
      {{ status }}
    </span>
  `,
  styles: [
    `
      .badge {
        padding: 4px 10px;
        border-radius: 6px;
        color: white;
        font-weight: bold;
      }
      .ok {
        background: #2ecc71;
      }
      .warn {
        background: #f39c12;
      }
      .critical {
        background: #e74c3c;
      }
    `,
  ],
})
export class StatusBadgeComponent {
  @Input() status!: string;
}
