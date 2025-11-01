import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../Models/user';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private readonly USERS_KEY = 'users_data';
  private readonly PRODUCTS_KEY = 'products_data';

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    // Force reinitialize products if they contain placeholder.com URLs
    const existingProducts = localStorage.getItem(this.PRODUCTS_KEY);
    if (existingProducts && existingProducts.includes('placeholder.com')) {
      localStorage.removeItem(this.PRODUCTS_KEY);
    }

    // Initialize users if not exists
    if (!localStorage.getItem(this.USERS_KEY)) {
      const defaultUsers: User[] = [
        {
          id: 1,
          email: 'admin@ecommerce.com',
          password: 'admin123',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          email: 'user@ecommerce.com',
          password: 'user123',
          firstName: 'Regular',
          lastName: 'User',
          role: 'user',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(defaultUsers));
    }

    // Initialize products if not exists
    if (!localStorage.getItem(this.PRODUCTS_KEY)) {
      const defaultProducts: Product[] = [
        {
          id: 1,
          title: 'iPhone 15 Pro',
          description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system',
          price: 999,
          discountPercentage: 5,
          rating: 4.8,
          stock: 50,
          brand: 'Apple',
          category: 'smartphones',
          thumbnail: 'https://images.unsplash.com/photo-1592286927505-2c0b4b8b13d7?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1592286927505-2c0b4b8b13d7?w=400&h=400&fit=crop']
        },
        {
          id: 2,
          title: 'Samsung Galaxy S24 Ultra',
          description: 'Powerful Android flagship with AI features, S Pen, and 200MP camera',
          price: 1199,
          discountPercentage: 10,
          rating: 4.7,
          stock: 75,
          brand: 'Samsung',
          category: 'smartphones',
          thumbnail: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop']
        },
        {
          id: 3,
          title: 'MacBook Pro 16"',
          description: 'Professional laptop with M3 Pro chip, stunning display, and all-day battery',
          price: 2499,
          discountPercentage: 8,
          rating: 4.9,
          stock: 30,
          brand: 'Apple',
          category: 'laptops',
          thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop']
        },
        {
          id: 4,
          title: 'Dell XPS 15',
          description: 'Premium Windows laptop with 4K OLED display and powerful performance',
          price: 1899,
          discountPercentage: 12,
          rating: 4.6,
          stock: 45,
          brand: 'Dell',
          category: 'laptops',
          thumbnail: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop']
        },
        {
          id: 5,
          title: 'Sony WH-1000XM5',
          description: 'Industry-leading noise cancelling headphones with premium sound quality',
          price: 399,
          discountPercentage: 15,
          rating: 4.9,
          stock: 120,
          brand: 'Sony',
          category: 'audio',
          thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop']
        },
        {
          id: 6,
          title: 'Apple AirPods Pro',
          description: 'Active noise cancellation, adaptive audio, and personalized spatial audio',
          price: 249,
          discountPercentage: 10,
          rating: 4.7,
          stock: 200,
          brand: 'Apple',
          category: 'audio',
          thumbnail: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop']
        },
        {
          id: 7,
          title: 'iPad Pro 12.9"',
          description: 'Ultimate iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support',
          price: 1099,
          discountPercentage: 5,
          rating: 4.8,
          stock: 60,
          brand: 'Apple',
          category: 'tablets',
          thumbnail: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop']
        },
        {
          id: 8,
          title: 'Samsung Galaxy Tab S9',
          description: 'Premium Android tablet with AMOLED display and S Pen included',
          price: 799,
          discountPercentage: 18,
          rating: 4.6,
          stock: 80,
          brand: 'Samsung',
          category: 'tablets',
          thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop']
        },
        {
          id: 9,
          title: 'Apple Watch Series 9',
          description: 'Advanced health monitoring, fitness tracking, and seamless iPhone integration',
          price: 429,
          discountPercentage: 8,
          rating: 4.8,
          stock: 150,
          brand: 'Apple',
          category: 'wearables',
          thumbnail: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop']
        },
        {
          id: 10,
          title: 'Samsung Galaxy Watch 6',
          description: 'Comprehensive health tracking with Google Wear OS and long battery life',
          price: 299,
          discountPercentage: 20,
          rating: 4.5,
          stock: 100,
          brand: 'Samsung',
          category: 'wearables',
          thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop']
        },
        {
          id: 11,
          title: 'Canon EOS R6',
          description: 'Professional mirrorless camera with 20MP full-frame sensor and 4K video',
          price: 2499,
          discountPercentage: 10,
          rating: 4.9,
          stock: 25,
          brand: 'Canon',
          category: 'cameras',
          thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop']
        },
        {
          id: 12,
          title: 'Sony A7 IV',
          description: 'Versatile full-frame mirrorless with 33MP sensor and advanced autofocus',
          price: 2699,
          discountPercentage: 7,
          rating: 4.8,
          stock: 20,
          brand: 'Sony',
          category: 'cameras',
          thumbnail: 'https://images.unsplash.com/photo-1606941369716-c1e2f1b8b2b9?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1606941369716-c1e2f1b8b2b9?w=400&h=400&fit=crop']
        },
        {
          id: 13,
          title: 'LG C3 OLED 65"',
          description: 'Premium 4K OLED TV with perfect blacks, vibrant colors, and gaming features',
          price: 1999,
          discountPercentage: 25,
          rating: 4.9,
          stock: 35,
          brand: 'LG',
          category: 'tvs',
          thumbnail: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop']
        },
        {
          id: 14,
          title: 'Samsung QN90C Neo QLED',
          description: 'Mini-LED 4K TV with quantum HDR and exceptional brightness',
          price: 1799,
          discountPercentage: 20,
          rating: 4.7,
          stock: 40,
          brand: 'Samsung',
          category: 'tvs',
          thumbnail: 'https://images.unsplash.com/photo-1585789575746-19d9d82a18f5?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1585789575746-19d9d82a18f5?w=400&h=400&fit=crop']
        },
        {
          id: 15,
          title: 'Bose SoundLink Revolve+',
          description: 'Portable Bluetooth speaker with 360-degree sound and 16-hour battery',
          price: 329,
          discountPercentage: 15,
          rating: 4.6,
          stock: 90,
          brand: 'Bose',
          category: 'audio',
          thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop',
          images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop']
        }
      ];
      localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(defaultProducts));
    }
  }

  // User CRUD Operations
  getUsers(): Observable<User[]> {
    const users = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    return of(users).pipe(delay(300)); // Simulate API delay
  }

  getUserById(id: number): Observable<User | undefined> {
    const users: User[] = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const user = users.find(u => u.id === id);
    return of(user).pipe(delay(300));
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    const users: User[] = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    return of(user).pipe(delay(300));
  }

  createUser(user: Omit<User, 'id' | 'createdAt'>): Observable<User> {
    const users: User[] = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    
    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
      return throwError(() => new Error('Email already exists'));
    }

    const newUser: User = {
      ...user,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return of(newUser).pipe(delay(300));
  }

  updateUser(id: number, updates: Partial<User>): Observable<User> {
    const users: User[] = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
      return throwError(() => new Error('User not found'));
    }

    // Check if email change conflicts with existing email
    if (updates.email && updates.email !== users[index].email) {
      if (users.some(u => u.id !== id && u.email.toLowerCase() === updates.email!.toLowerCase())) {
        return throwError(() => new Error('Email already exists'));
      }
    }

    users[index] = { ...users[index], ...updates };
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return of(users[index]).pipe(delay(300));
  }

  deleteUser(id: number): Observable<boolean> {
    const users: User[] = JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
    const filteredUsers = users.filter(u => u.id !== id);

    if (filteredUsers.length === users.length) {
      return throwError(() => new Error('User not found'));
    }

    localStorage.setItem(this.USERS_KEY, JSON.stringify(filteredUsers));
    return of(true).pipe(delay(300));
  }

  // Product CRUD Operations
  getProducts(): Observable<Product[]> {
    const products = JSON.parse(localStorage.getItem(this.PRODUCTS_KEY) || '[]');
    return of(products).pipe(delay(300));
  }

  getProductById(id: number): Observable<Product | undefined> {
    const products: Product[] = JSON.parse(localStorage.getItem(this.PRODUCTS_KEY) || '[]');
    const product = products.find(p => p.id === id);
    return of(product).pipe(delay(300));
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const products: Product[] = JSON.parse(localStorage.getItem(this.PRODUCTS_KEY) || '[]');
    
    const newProduct: Product = {
      ...product,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };

    products.push(newProduct);
    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
    return of(newProduct).pipe(delay(300));
  }

  updateProduct(id: number, updates: Partial<Product>): Observable<Product> {
    const products: Product[] = JSON.parse(localStorage.getItem(this.PRODUCTS_KEY) || '[]');
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return throwError(() => new Error('Product not found'));
    }

    products[index] = { ...products[index], ...updates };
    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(products));
    return of(products[index]).pipe(delay(300));
  }

  deleteProduct(id: number): Observable<boolean> {
    const products: Product[] = JSON.parse(localStorage.getItem(this.PRODUCTS_KEY) || '[]');
    const filteredProducts = products.filter(p => p.id !== id);

    if (filteredProducts.length === products.length) {
      return throwError(() => new Error('Product not found'));
    }

    localStorage.setItem(this.PRODUCTS_KEY, JSON.stringify(filteredProducts));
    return of(true).pipe(delay(300));
  }

  // Utility methods
  resetData(): void {
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.PRODUCTS_KEY);
    this.initializeData();
  }
}
