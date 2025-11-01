import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MockDataService } from '../../services/mock-data.service';
import { User } from '../../Models/user';
import { Product } from '../../Models/product';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  users: User[] = [];
  products: Product[] = [];
  loading = true;
  activeTab: 'users' | 'products' = 'products';
  private routerSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.loadData();
    
    // Reload data when navigating back to this component
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url === '/admin-dashboard') {
        this.loadData();
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  loadData(): void {
    this.loading = true;
    
    this.mockDataService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => console.error('Error loading users:', error)
    });

    this.mockDataService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  setActiveTab(tab: 'users' | 'products'): void {
    this.activeTab = tab;
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.mockDataService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
        },
        error: (error) => {
          alert('Error deleting user: ' + error.message);
        }
      });
    }
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.mockDataService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (error) => {
          alert('Error deleting product: ' + error.message);
        }
      });
    }
  }

  getDiscountedPrice(product: Product): number {
    return product.price - (product.price * product.discountPercentage / 100);
  }

  getAdminCount(): number {
    return this.users.filter(u => u.role === 'admin').length;
  }
}
