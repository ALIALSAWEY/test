import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Column {
  key: string;
  label: string;
  format?: (value: any) => string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th *ngFor="let col of columns" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr *ngFor="let row of data">
            <td *ngFor="let col of columns" class="px-6 py-4 whitespace-nowrap">
              <ng-container *ngIf="col.format; else defaultFormat">
                {{ col.format(row[col.key]) }}
              </ng-container>
              <ng-template #defaultFormat>
                {{ row[col.key] }}
              </ng-template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class DataTableComponent {
  @Input() columns!: Column[];
  @Input() data!: any[];
}