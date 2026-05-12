// src/app/pages/alerts/alerts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { AlertsService, PerfAlert } from 'src/app/service/alert-service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent implements OnInit {
  alerts: PerfAlert[] = [];

  constructor(private api: AlertsService) {}

  ngOnInit(): void {
    this.api.getAll().subscribe((a) => (this.alerts = a));
  }

  getLevelClass(level: string): string {
    return level.toLowerCase();
  }
}
