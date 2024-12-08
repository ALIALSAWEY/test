import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img [src]="product.image" [alt]="product.name" class="w-full h-48 object-cover">
      
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
        <p class="text-gray-600 mb-2">{{ product.description }}</p>
        
        <div class="flex justify-between items-center">
          <span class="text-xl font-bold">${{ product.price }}</span>
          <span class="text-sm text-green-600">
            Commission: ${{ product.commission }}
          </span>
        </div>
        
        <button 
          (click)="addToCart()"
          class="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}