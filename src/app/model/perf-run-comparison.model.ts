import { PerfRun } from './perf-run';

export interface PerfRunComparison {
  runA: PerfRun;
  runB: PerfRun;
  deltaScore: number;
  deltaError: number;
  deltaP95: number;
}
