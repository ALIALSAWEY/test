import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StatsCardComponent } from '../../../components/dashboard/stats-card/stats-card.component';
import { ChartCardComponent } from '../../../components/dashboard/chart-card/chart-card.component';
import { DataTableComponent } from '../../../components/dashboard/data-table/data-table.component';
import { MarketerService } from '../../../core/services/marketer.service';

@Component({
  selector: 'app-marketer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, StatsCardComponent, ChartCardComponent, DataTableComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-8">Marketer Dashboard</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <app-stats-card
          title="Total Earnings"
          [value]="summary.totalEarnings"
          prefix="$"
          valueColorClass="text-green-600"
        />
        <app-stats-card
          title="Active Orders"
          [value]="summary.completedOrders"
          valueColorClass="text-blue-600"
        />
        <app-stats-card
          title="Conversion Rate"
          [value]="summary.conversionRate"
          suffix="%"
          valueColorClass="text-purple-600"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <app-chart-card
          title="Earnings Overview"
          [chartData]="earningsChartData"
        />
        
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold mb-4">Recent Orders</h3>
          <app-data-table
            [columns]="orderColumns"
            [data]="recentOrders"
          />
        </div>
      </div>
    </div>
  `
})
export class MarketerDashboardComponent implements OnInit {
  summary = {
    totalEarnings: 0,
    completedOrders: 0,
    conversionRate: 0
  };

  recentOrders: any[] = [];
  monthlyEarnings: number[] = [];

  orderColumns = [
    { key: 'id', label: 'Order ID' },
    { key: 'productName', label: 'Product' },
    { key: 'commission', label: 'Commission', format: (value: number) => `$${value.toFixed(2)}` },
    { key: 'status', label: 'Status' }
  ];

  get earningsChartData() {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Monthly Earnings',
        data: this.monthlyEarnings,
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      }]
    };
  }

  constructor(private marketerService: MarketerService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.marketerService.getEarningsSummary().subscribe(summary => {
      this.summary = {
        totalEarnings: summary.totalEarnings,
        completedOrders: summary.completedOrders,
        conversionRate: summary.conversionRate
      };
    });

    this.marketerService.getRecentOrders().subscribe(orders => {
      this.recentOrders = orders;
    });

    this.marketerService.getMonthlyEarnings().subscribe(earnings => {
      this.monthlyEarnings = earnings;
    });
  }
}