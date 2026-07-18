export interface PerfRun {
  id: number;
  app: string;
  scenario: string;
  date: string;

  p95: number;
  httpReqFailed: number;
  globalScore: number;
  status: string;

  rawSummaryJson: any;
  parsedMetrics: any;
  checksSuccessRate: number;
}
