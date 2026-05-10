import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  template: `
    <div [class]="theme() + '-theme'">
      <header
        style="display:flex;align-items:center;gap:1rem;padding:0.5rem 1rem;"
      >
        <h1 style="flex:1;">Perf Dashboard</h1>
        <button (click)="toggleTheme()">
          {{ theme() === 'light' ? '🌙 Dark' : '🌞 Light' }}
        </button>
      </header>

      <main style="padding:1rem;">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class AppComponent {
  theme = signal<'light' | 'dark'>('light');

  toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }
}
