import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="relative" #cartDropdown>
      <button 
        (click)="toggleDropdown()"
        class="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span class="font-medium">{{ totalItems$ | async }}</span>
      </button>

      <div *ngIf="isOpen" class="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50">
        <div class="p-4">
          <h3 class="text-lg font-semibold mb-4">Shopping Cart</h3>
          
          <div *ngIf="(cart$ | async)?.length === 0" class="text-gray-500 text-center py-4">
            Your cart is empty
          </div>

          <div *ngIf="(cart$ | async)?.length as itemCount" class="space-y-4">
            <div *ngFor="let item of cart$ | async" class="flex items-center space-x-4">
              <img [src]="item.product.image" [alt]="item.product.name" class="w-12 h-12 object-cover rounded">
              <div class="flex-1">
                <h4 class="text-sm font-medium">{{ item.product.name }}</h4>
                <p class="text-sm text-gray-500">
                  {{ item.quantity }} × ${{ item.product.price }}
                </p>
              </div>
              <button 
                (click)="removeItem(item.product.id)"
                class="text-red-500 hover:text-red-700"
              >
                ×
              </button>
            </div>

            <div class="border-t pt-4">
              <div class="flex justify-between font-medium">
                <span>Total:</span>
                <span>${{ totalAmount$ | async }}</span>
              </div>
              
              <a 
                routerLink="/checkout"
                class="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CartSummaryComponent implements OnInit {
  isOpen = false;
  cart$: Observable<CartItem[]>;
  totalItems$: Observable<number>;
  totalAmount$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cart$;
    this.totalItems$ = this.cartService.totalItems$;
    this.totalAmount$ = this.cartService.totalAmount$;
  }

  ngOnInit(): void {
    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      const cartDropdown = document.querySelector('#cartDropdown');
      if (cartDropdown && !cartDropdown.contains(event.target as Node)) {
        this.isOpen = false;
      }
    });
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}