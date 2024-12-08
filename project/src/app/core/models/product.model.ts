import { SafeUrl } from '@angular/platform-browser';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  commission: number;
  image: string | SafeUrl;
  category: string;
  stock: number;
  status: 'active' | 'inactive';
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: 'active' | 'inactive';
}