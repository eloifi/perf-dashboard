import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PerfService {
  getApplications() {
    return [];
  }

  getRuns() {
    return [];
  }

  getRunDetails(id: string) {
    return {};
  }
}
