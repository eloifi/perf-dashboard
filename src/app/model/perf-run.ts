export interface PerfRun {
  id: string;
  app: string;
  scenario: string;
  status: string;
  p95: number;
  p99: number;
  errorRate: number;
  globalScore: number;
  error: number;
  score: number;
  timestamp: string;
  throughput?: number;
  parsedMetrics?: {
    [metric: string]: {
      values: {
        avg?: number;
        min?: number;
        max?: number;
        'p(95)'?: number;
        'p(99)'?: number;
      };
    };
  };
}
