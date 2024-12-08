import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Featured Products</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <app-product-card
          *ngFor="let product of products"
          [product]="product"
        />
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      description: 'Product description here',
      image: 'https://via.placeholder.com/300',
      commission: 10
    }
  ];

  ngOnInit() {
    // Will fetch products from API
  }
}