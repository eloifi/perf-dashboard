import { Component } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

// Angular Material 16 — modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    UpperCasePipe,
    RouterOutlet,
    RouterLink,

    // Material modules
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
// ... mêmes imports qu’avant
export class LayoutComponent {
  envs = ['dev', 'qa', 'prod'];
  env = { current: 'dev' };
  dark = false;

  changeEnv(newEnv: string) {
    this.env.current = newEnv;
  }

  toggleDark() {
    this.dark = !this.dark;
  }
}
