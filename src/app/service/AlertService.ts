interface PerfAlert {
  level: 'info' | 'warning' | 'critical';
  message: string;
  metric?: string;
}

function buildAlerts(run: any): PerfAlert[] {
  const alerts: PerfAlert[] = [];
  const p95 = run.metrics['http_req_duration']?.['p(95)'] ?? 0;
  const failRate = run.metrics['http_req_failed']?.value ?? 0;
  const checksValue = run.metrics['checks']?.value ?? 1;

  if (p95 > 100) {
    alerts.push({
      level: 'warning',
      metric: 'http_req_duration.p(95)',
      message: `p95 élevé: ${p95.toFixed(2)} ms`,
    });
  }

  if (failRate > 0) {
    alerts.push({
      level: 'critical',
      metric: 'http_req_failed',
      message: `Taux d'erreur > 0 (${failRate})`,
    });
  }

  if (checksValue < 1) {
    alerts.push({
      level: 'warning',
      metric: 'checks.value',
      message: `Des checks ont échoué (value=${checksValue})`,
    });
  }

  return alerts;
}
