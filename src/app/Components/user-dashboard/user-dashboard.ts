import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MockDataService } from '../../services/mock-data.service';
import { User } from '../../Models/user';
import { Product } from '../../Models/product';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboardComponent implements OnInit {
  currentUser: User | null = null;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: { id: string; name: string }[] = [];
  selectedCategory = 'all';
  loading = true;

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.mockDataService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.extractCategories();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  extractCategories(): void {
    const uniqueCategories = Array.from(new Set(this.products.map(p => p.category)));
    this.categories = [
      { id: 'all', name: 'All Categories' },
      ...uniqueCategories.map(cat => ({ 
        id: cat, 
        name: cat.charAt(0).toUpperCase() + cat.slice(1) 
      }))
    ];
  }

  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCategory = select.value;
    this.filterProducts();
  }

  filterProducts(): void {
    if (this.selectedCategory === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === this.selectedCategory);
    }
  }

  getDiscountedPrice(product: Product): number {
    return product.price - (product.price * product.discountPercentage / 100);
  }
}
