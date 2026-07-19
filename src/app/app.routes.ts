import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiffRunsPageComponent } from './pages/diff-runs/diff-runs-page.component';
import { RunsPage } from './pages/runs/runs.page';
import { ApplicationsPage } from './pages/applications/applications.page';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'diff', component: DiffRunsPageComponent },
  { path: 'runs', component: RunsPage },
  { path: 'applications', component: ApplicationsPage },
];
