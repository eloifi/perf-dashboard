import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStore {
  private selectedApp = signal<string>('way2home-autocomplete');

  app = this.selectedApp.asReadonly();

  setApp(app: string) {
    this.selectedApp.set(app);
  }
}
