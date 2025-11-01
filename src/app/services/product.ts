import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../Models/product';
import { MockDataService } from './mock-data.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  products = signal<Product[]>([]);

  constructor(private mockDataService: MockDataService) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.mockDataService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
      },
      error: (error) => console.error('Error loading products:', error)
    });
  }

  getCategories(): { id: string; name: string }[] {
    const unique = Array.from(new Set(this.products().map(p => p.category)));
    return [{ id: 'all', name: 'All' }, ...unique.map(cat => ({ id: cat, name: cat }))];
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.mockDataService.getProductById(id);
  }

  addProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.mockDataService.createProduct(product).pipe(
      tap(() => this.loadProducts())
    );
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.mockDataService.updateProduct(id, product).pipe(
      tap(() => this.loadProducts())
    );
  }

  deleteProduct(id: number): Observable<boolean> {
    return this.mockDataService.deleteProduct(id).pipe(
      tap(() => this.loadProducts())
    );
  }
}