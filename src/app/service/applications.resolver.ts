import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ApplicationService } from '../service/application.service';

export const applicationsResolver: ResolveFn<any> = () => {
  return inject(ApplicationService).getApplications();
};
