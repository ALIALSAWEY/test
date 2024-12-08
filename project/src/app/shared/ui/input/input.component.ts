import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-2">
      <label
        *ngIf="label"
        [for]="id"
        class="text-sm font-medium text-gray-700"
      >
        {{ label }}
      </label>
      
      <div class="relative">
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [class]="inputClasses"
          [attr.aria-invalid]="!!error"
          [attr.aria-describedby]="error ? id + '-error' : null"
        >
      </div>

      <p
        *ngIf="error"
        [id]="id + '-error'"
        class="text-sm text-red-600"
      >
        {{ error }}
      </p>
    </div>
  `
})
export class InputComponent {
  @Input() id!: string;
  @Input() label?: string;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() error?: string;

  get inputClasses(): string {
    return `
      w-full rounded-md border px-3 py-2 text-sm
      ${this.error
        ? 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      }
    `;
  }
}