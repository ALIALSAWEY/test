import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface EarningsSummary {
  totalEarnings: number;
  pendingEarnings: number;
  completedOrders: number;
  conversionRate: number;
}

export interface Order {
  id: string;
  productName: string;
  commission: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class MarketerService {
  getEarningsSummary(): Observable<EarningsSummary> {
    // Simulate API call - replace with actual API integration
    return of({
      totalEarnings: 1234.56,
      pendingEarnings: 345.67,
      completedOrders: 12,
      conversionRate: 2.4
    });
  }

  getRecentOrders(): Observable<Order[]> {
    // Simulate API call - replace with actual API integration
    return of([
      {
        id: '12345',
        productName: 'Premium Product',
        commission: 25.00,
        status: 'completed',
        date: new Date()
      },
      {
        id: '12346',
        productName: 'Deluxe Package',
        commission: 35.00,
        status: 'pending',
        date: new Date()
      }
    ]);
  }

  getMonthlyEarnings(): Observable<number[]> {
    // Simulate API call - replace with actual API integration
    return of([650, 900, 750, 1200, 1500, 1234]);
  }
}