import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/models/product.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img [src]="product.image" [alt]="product.name" class="w-full h-48 object-cover">
      
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
        <p class="text-gray-600 mb-2 line-clamp-2">{{ product.description }}</p>
        
        <div class="flex justify-between items-center mb-4">
          <span class="text-xl font-bold">${{ product.price }}</span>
          <span class="text-sm text-green-600">
            Commission: ${{ product.commission }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <button 
            (click)="onAddToCart()"
            class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            [disabled]="product.stock === 0"
          >
            {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  constructor(private cartService: CartService) {}

  onAddToCart(): void {
    if (this.product.stock > 0) {
      this.cartService.addToCart(this.product);
      this.addToCart.emit(this.product);
    }
  }
}