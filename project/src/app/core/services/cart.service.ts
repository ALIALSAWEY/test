import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = new BehaviorSubject<CartItem[]>([]);

  get cart$(): Observable<CartItem[]> {
    return this.items.asObservable();
  }

  get totalItems$(): Observable<number> {
    return this.cart$.pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0))
    );
  }

  get totalAmount$(): Observable<number> {
    return this.cart$.pipe(
      map(items => items.reduce((total, item) => total + (item.product.price * item.quantity), 0))
    );
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.items.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.items.next([...currentItems]);
    } else {
      this.items.next([...currentItems, { product, quantity }]);
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.items.value;
    this.items.next(currentItems.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.items.value;
    const item = currentItems.find(item => item.product.id === productId);
    
    if (item) {
      item.quantity = quantity;
      this.items.next([...currentItems]);
    }
  }

  clearCart(): void {
    this.items.next([]);
  }
}