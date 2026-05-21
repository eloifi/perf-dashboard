// src/app/models/perf-run.model.ts
export interface PerfRun {
  id: number;
  date: string;
  p95: number;
  httpReqFailed: number;
  globalScore: number;
  status: 'OK' | 'WARN' | 'CRITICAL';
  scenario: string;
  rawSummaryJson: string;
  app: string;
  checksSuccessRate: number;
  parsedMetrics?: any;
}
