import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-chart-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
      <canvas #chartCanvas></canvas>
    </div>
  `
})
export class ChartCardComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() title!: string;
  @Input() chartData!: ChartConfiguration['data'];
  @Input() chartOptions?: ChartConfiguration['options'];

  private chart?: Chart;

  ngOnInit() {
    setTimeout(() => this.initializeChart(), 0);
  }

  private initializeChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: false
          }
        },
        ...this.chartOptions
      }
    });
  }
}