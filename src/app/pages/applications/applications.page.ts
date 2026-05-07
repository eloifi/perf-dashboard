import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../service/application.service';

@Component({
  standalone: true,
  selector: 'app-applications',
  imports: [CommonModule],
  template: `
    <h2>Applications</h2>
    <ul>
      <li *ngFor="let app of apps">{{ app }}</li>
    </ul>
  `,
})
export class ApplicationsPage {
  apps: string[] = [];

  constructor(private appService: ApplicationService) {
    this.appService.getApplications().subscribe((apps) => {
      this.apps = apps;
    });
  }
}
