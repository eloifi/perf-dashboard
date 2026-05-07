import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RunService, Run } from '../../service/run.service';
import { AppStore } from 'src/app/service/app.store';

@Component({
  standalone: true,
  selector: 'app-run-details',
  imports: [CommonModule],
  templateUrl: './run-details.page.html',
})
export class RunDetailsPage {
  run?: Run;
  comparison: any;

  constructor(
    private route: ActivatedRoute,
    private runService: RunService,
    private appStore: AppStore,
  ) {
    const id = this.route.snapshot.paramMap.get('id')!;

    effect(() => {
      const app = this.appStore.app();
      if (!app) return;

      this.runService.getRun(id, app).subscribe((run) => {
        this.run = run;
      });

      this.runService.getRunComparison(id, app).subscribe((cmp) => {
        this.comparison = cmp;
      });
    });
  }
}
