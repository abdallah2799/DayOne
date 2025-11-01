import { Routes } from '@angular/router';
import { ProductListComponent } from './Components/product-list/product-list';
import { ProductFormComponent } from './Components/product-form/product-form';
import { ProductDetailsComponent } from './Components/product-details/product-details';
import { ErrorPageComponent } from './Components/error-page/error-page';
import { LoginComponent } from './Components/login/login';
import { RegisterComponent } from './Components/register/register';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard';
import { UserDashboardComponent } from './Components/user-dashboard/user-dashboard';
import { UserFormComponent } from './Components/user-form/user-form';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  // Public routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { showNavbar: false } },
  { path: 'register', component: RegisterComponent, data: { showNavbar: false } },
  
  // Protected routes - require authentication
  { 
    path: 'products', 
    component: ProductListComponent, 
    canActivate: [authGuard],
    data: { showNavbar: true } 
  },
  { 
    path: 'product/:id', 
    component: ProductDetailsComponent, 
    canActivate: [authGuard],
    data: { showNavbar: true } 
  },
  
  // Admin only routes
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [adminGuard],
    data: { showNavbar: true } 
  },
  { 
    path: 'add-product', 
    component: ProductFormComponent, 
    canActivate: [adminGuard],
    data: { showNavbar: true } 
  },
  { 
    path: 'edit-product/:id', 
    component: ProductFormComponent, 
    canActivate: [adminGuard],
    data: { showNavbar: true } 
  },
  { 
    path: 'admin/users/add', 
    component: UserFormComponent, 
    canActivate: [adminGuard],
    data: { showNavbar: true } 
  },
  { 
    path: 'admin/users/edit/:id', 
    component: UserFormComponent, 
    canActivate: [adminGuard],
    data: { showNavbar: true } 
  },
  
  // Regular user dashboard
  { 
    path: 'user-dashboard', 
    component: UserDashboardComponent, 
    canActivate: [authGuard],
    data: { showNavbar: true } 
  },
  
  // 404 page
  { path: '**', component: ErrorPageComponent, data: { showNavbar: false } }
];
