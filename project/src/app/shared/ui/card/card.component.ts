import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 transition-shadow hover:shadow-md">
      <div *ngIf="header" class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">{{ header }}</h3>
      </div>
      
      <div [class]="contentClasses">
        <ng-content></ng-content>
      </div>
      
      <div *ngIf="footer" class="px-6 py-4 border-t border-gray-200">
        {{ footer }}
      </div>
    </div>
  `
})
export class CardComponent {
  @Input() header?: string;
  @Input() footer?: string;
  @Input() padding = true;

  get contentClasses(): string {
    return this.padding ? 'p-6' : '';
  }
}