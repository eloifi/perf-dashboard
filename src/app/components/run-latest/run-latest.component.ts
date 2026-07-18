import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfRunService } from 'src/app/service/perfs-run.service';
import { PerfRun } from 'src/app/model/perf-run';

@Component({
  selector: 'app-run-latest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './run-latest.component.html',
  styleUrls: ['./run-latest.component.scss'],
})
export class RunLatestComponent implements OnInit {
  run?: PerfRun;

  constructor(private perfRunService: PerfRunService) {}

  ngOnInit(): void {
    this.perfRunService
      .getLatest('way2home', 'search')
      .subscribe((r) => (this.run = r));
  }
}
