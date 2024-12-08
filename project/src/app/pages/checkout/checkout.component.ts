import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Checkout Form -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-6">Checkout Information</h2>
          
          <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
            <div class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  formControlName="name"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  formControlName="phone"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  id="address"
                  formControlName="address"
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div>
                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="city"
                  formControlName="city"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
              </div>
              
              <div>
                <label for="paymentMethod" class="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  id="paymentMethod"
                  formControlName="paymentMethod"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="credit">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              [disabled]="checkoutForm.invalid"
              class="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
            >
              Place Order
            </button>
          </form>
        </div>

        <!-- Order Summary -->
        <div class="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 class="text-2xl font-bold mb-6">Order Summary</h2>
          
          <div class="space-y-4">
            <div *ngFor="let item of cartItems" class="flex justify-between items-center py-2 border-b">
              <div>
                <h3 class="font-medium">{{ item.name }}</h3>
                <p class="text-sm text-gray-500">Quantity: 1</p>
              </div>
              <p class="font-medium">${{ item.price }}</p>
            </div>
            
            <div class="flex justify-between items-center py-2 border-b">
              <p class="text-gray-600">Subtotal</p>
              <p class="font-medium">${{ calculateSubtotal() }}</p>
            </div>
            
            <div class="flex justify-between items-center py-2 border-b">
              <p class="text-gray-600">Shipping</p>
              <p class="font-medium">$10.00</p>
            </div>
            
            <div class="flex justify-between items-center py-2">
              <p class="font-bold">Total</p>
              <p class="font-bold text-xl">${{ calculateTotal() }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  cartItems: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      paymentMethod: ['credit', [Validators.required]]
    });

    this.cartItems = this.cartService.getItems();
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  calculateTotal(): number {
    return this.calculateSubtotal() + 10; // Adding $10 shipping
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Order placed:', {
        ...this.checkoutForm.value,
        items: this.cartItems,
        total: this.calculateTotal()
      });
      // TODO: Implement order submission
      this.cartService.clearCart();
    }
  }
}