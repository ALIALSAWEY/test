import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductFilters } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Premium Smartphone',
      description: 'Latest model with advanced features',
      price: 999.99,
      commission: 50,
      image: 'https://via.placeholder.com/300',
      category: 'Electronics',
      stock: 50,
      status: 'active'
    },
    {
      id: 2,
      name: 'Designer Watch',
      description: 'Luxury timepiece with premium materials',
      price: 299.99,
      commission: 30,
      image: 'https://via.placeholder.com/300',
      category: 'Accessories',
      stock: 25,
      status: 'active'
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  getProducts(filters?: ProductFilters): Observable<Product[]> {
    return this.productsSubject.pipe(
      map(products => this.applyFilters(products, filters))
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.productsSubject.pipe(
      map(products => products.find(p => p.id === id))
    );
  }

  private applyFilters(products: Product[], filters?: ProductFilters): Product[] {
    if (!filters) return products;

    return products.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.minPrice && product.price < filters.minPrice) return false;
      if (filters.maxPrice && product.price > filters.maxPrice) return false;
      if (filters.status && product.status !== filters.status) return false;
      return true;
    });
  }
}