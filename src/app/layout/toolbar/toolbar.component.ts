import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { AppStore } from 'src/app/service/app.store';
import { ApplicationService } from 'src/app/service/application.service';

@Component({
  standalone: true,
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, MatToolbarModule],
})
export class ToolbarComponent {
  apps: any[] = [];
  selectedApp = '';

  constructor(
    private appService: ApplicationService,
    private appStore: AppStore,
  ) {
    this.appService.getApplications().subscribe((apps) => {
      this.apps = apps;
      this.selectedApp = this.appStore.app();
    });
  }

  onSelect(app: string) {
    this.appStore.setApp(app);
  }
}
