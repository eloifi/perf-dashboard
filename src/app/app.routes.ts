import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ApplicationsPage } from './pages/applications/applications.page';
import { RunDetailsPage } from './pages/run-details/run-details.page';
import { RunsPage } from './pages/runs/runs.page';
import { applicationsResolver } from './service/applications.resolver';
import { GraphsPageComponent } from './pages/graphs/graphs.page';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'applications', pathMatch: 'full' },
      { path: 'applications', component: ApplicationsPage },
      //{ path: 'runs', component: RunsPage },
      //{ path: 'runs/:id', component: RunDetailsPage },
      //{ path: 'graphs', component: GraphsPage },
      {
        path: 'runs',
        component: RunsPage,
        resolve: { apps: applicationsResolver },
      },
      {
        path: 'graphs',
        component: GraphsPageComponent,
        resolve: { apps: applicationsResolver },
      },
      {
        path: 'runs/:id',
        component: RunDetailsPage,
        resolve: { apps: applicationsResolver },
      },
    ],
  },
];
