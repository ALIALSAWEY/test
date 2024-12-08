import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface AdminSummary {
  totalSales: number;
  activeMarketers: number;
  pendingOrders: number;
  totalProducts: number;
}

export interface MarketerPerformance {
  id: number;
  name: string;
  email: string;
  totalSales: number;
  commission: number;
  status: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getAdminSummary(): Observable<AdminSummary> {
    // Simulate API call - replace with actual API integration
    return of({
      totalSales: 12345.67,
      activeMarketers: 45,
      pendingOrders: 8,
      totalProducts: 124
    });
  }

  getTopMarketers(): Observable<MarketerPerformance[]> {
    // Simulate API call - replace with actual API integration
    return of([
      {
        id: 1,
        name: 'Ahmed Mohammed',
        email: 'ahmed@example.com',
        totalSales: 4567,
        commission: 456,
        status: 'active'
      }
    ]);
  }

  getMonthlySales(): Observable<number[]> {
    // Simulate API call - replace with actual API integration
    return of([6500, 9000, 7500, 12000, 15000, 12345]);
  }
}