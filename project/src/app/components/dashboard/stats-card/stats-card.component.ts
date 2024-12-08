import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-2">{{ title }}</h3>
      <p [class]="'text-3xl font-bold ' + valueColorClass">{{ prefix }}{{ value }}{{ suffix }}</p>
      <p *ngIf="change" class="text-sm mt-2" [class]="changeColorClass">
        {{ change > 0 ? '↑' : '↓' }} {{ change }}% from last month
      </p>
    </div>
  `
})
export class StatsCardComponent {
  @Input() title!: string;
  @Input() value!: string | number;
  @Input() prefix: string = '';
  @Input() suffix: string = '';
  @Input() valueColorClass: string = 'text-gray-900';
  @Input() change?: number;

  get changeColorClass(): string {
    if (!this.change) return '';
    return this.change > 0 ? 'text-green-600' : 'text-red-600';
  }
}