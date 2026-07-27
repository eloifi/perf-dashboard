import {
  Component,
  Input,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as echarts from 'echarts';
import { MetricsService } from '../services/metrics.service';
import { MetricPoint } from '../models/metric-point';

@Component({
  selector: 'line-chart-yearly',
  standalone: true,
  template: ` <div #chartContainer class="w-full h-[320px]"></div> `,
})
export class LineChartYearlyComponent implements OnInit, AfterViewInit {
  @Input() app!: string;
  @Input() scenario!: string;

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart!: echarts.ECharts;
  private points: MetricPoint[] = [];
  private resizeObserver!: ResizeObserver;

  constructor(private metrics: MetricsService) {}

  ngOnInit() {
    this.metrics.getYearlyP95(this.app, this.scenario).subscribe((points) => {
      this.points = points;
      this.updateChart();
    });
  }

  ngAfterViewInit() {
    // Observe container size changes
    this.resizeObserver = new ResizeObserver(() => {
      this.initChart();
      this.updateChart();
    });

    this.resizeObserver.observe(this.chartContainer.nativeElement);
  }

  private initChart() {
    if (!this.chartContainer.nativeElement.offsetHeight) return;

    if (!this.chart) {
      this.chart = echarts.init(this.chartContainer.nativeElement);
    } else {
      this.chart.resize();
    }
  }

  private updateChart() {
    if (!this.points.length || !this.chart) return;

    const data = this.points.map((p) => [p.timestamp, p.value]);

    const options: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      animation: false,

      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1f2937',
        borderColor: '#374151',
        textStyle: { color: '#e5e7eb' },
      },

      xAxis: {
        type: 'time',
        axisLabel: { color: '#9ca3af' },
        axisLine: { lineStyle: { color: '#4b5563' } },
      },

      yAxis: {
        type: 'value',
        axisLabel: { color: '#9ca3af' },
        axisLine: { lineStyle: { color: '#4b5563' } },
        splitLine: { lineStyle: { color: '#374151' } },
      },

      series: [
        {
          name: 'p95',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            color: '#00ffee',
            width: 2,
          },
          areaStyle: {
            color: 'rgba(0,255,238,0.25)',
          },
          data,
        },
      ],
    };

    this.chart.setOption(options);
  }
}
