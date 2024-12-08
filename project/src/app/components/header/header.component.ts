import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartSummaryComponent } from '../cart/cart-summary/cart-summary.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, CartSummaryComponent],
  template: `
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
        <a routerLink="/" class="text-2xl font-bold text-gray-800">
          Affiliate Store
        </a>
        
        <div class="flex items-center space-x-6">
          <app-cart-summary />
          
          <ng-container *ngIf="!isAuthenticated(); else userMenu">
            <a routerLink="/login" class="text-gray-600 hover:text-gray-900">Login</a>
            <a 
              routerLink="/register" 
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Register
            </a>
          </ng-container>

          <ng-template #userMenu>
            <div class="relative">
              <button 
                (click)="toggleUserMenu()"
                class="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span>{{ getCurrentUser()?.name }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>

              <div *ngIf="isUserMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <a 
                  [routerLink]="['/marketer/dashboard']" 
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </a>
                <button 
                  (click)="logout()"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </ng-template>
        </div>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  isUserMenuOpen = false;

  constructor(private authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isUserMenuOpen = false;
  }
}