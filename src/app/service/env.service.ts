import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EnvService {
  envs = ['dev', 'qa', 'prod'];
  current = 'dev';

  setEnv(env: string) {
    this.current = env;
  }
}
