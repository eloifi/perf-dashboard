// src/app/models/perf-run.model.ts
export type PerfStatus = 'OK' | 'WARN' | 'CRITICAL';

export interface PerfRun {
  id: number;
  app: string;
  scenario: string;
  date: string;
  p95: number;
  httpReqFailed: number;
  globalScore: number;
  status: PerfStatus;
  rawSummaryJson: any;
}
