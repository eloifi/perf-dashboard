export interface MetricPoint {
  timestamp: number; // Unix ms
  value: number; // p95, p99, error, score, TPS
}
