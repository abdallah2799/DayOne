# E-Commerce Angular Application

A complete Angular e-commerce application with authentication, role-based access control, and CRUD operations for users and products.

## Features

### Authentication & Authorization
- **Login System** with Reactive Forms validation
- **Registration System** with password confirmation
- **Role-Based Access Control** (Admin & User roles)
- **Auth Guards** to protect routes
- **Persistent Sessions** using localStorage

### User Roles

#### Admin Features
- Access to Admin Dashboard
- Manage Users (Add, Edit, Delete, View)
- Manage Products (Add, Edit, Delete, View)
- View statistics (Total Users, Products, Admins)
- Full CRUD operations on all data

#### User Features
- Access to User Dashboard
- View products catalog
- View product details
- Browse products by category

### Data Management
- **Mock Data Service** simulating local JSON storage using localStorage
- **Reactive Forms** for all form validations
- **Dynamic Data Updates** with observables
- Pre-populated with demo users and products

## Technology Stack

- **Angular 20.3.0**
- **TypeScript 5.9.2**
- **Bootstrap 5.3.8** for UI styling
- **Bootstrap Icons** for icons
- **RxJS 7.8.0** for reactive programming
- **Angular Router** for navigation
- **Reactive Forms** for form handling

## Project Structure

```
src/
├── app/
│   ├── Components/
│   │   ├── login/              # Login page with validation
│   │   ├── register/           # Registration page
│   │   ├── admin-dashboard/    # Admin dashboard with user/product management
│   │   ├── user-dashboard/     # User dashboard (view only)
│   │   ├── user-form/          # Add/Edit user form
│   │   ├── product-list/       # Products listing
│   │   ├── product-form/       # Add/Edit product form
│   │   ├── product-details/    # Product details view
│   │   ├── navbar/             # Dynamic navigation bar
│   │   └── error-page/         # 404 error page
│   ├── guards/
│   │   ├── auth.guard.ts       # Protect authenticated routes
│   │   └── admin.guard.ts      # Protect admin-only routes
│   ├── services/
│   │   ├── auth.service.ts     # Authentication logic
│   │   ├── mock-data.service.ts # Data storage simulation
│   │   └── product.ts          # Product service
│   ├── Models/
│   │   ├── user.ts             # User interface
│   │   └── product.ts          # Product interface
│   └── app.routes.ts           # Route configuration
└── index.html
```

## Demo Credentials

### Admin Account
- **Email:** admin@ecommerce.com
- **Password:** admin123
- **Access:** Full system access

### User Account
- **Email:** user@ecommerce.com
- **Password:** user123
- **Access:** Limited to viewing products

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`

3. **Build for Production**
   ```bash
   npm run build
   ```

## Key Components

### Authentication Flow
1. User accesses the application → Redirected to login page
2. User logs in or registers
3. On successful login:
   - Admin users → Redirected to Admin Dashboard
   - Regular users → Redirected to User Dashboard
4. Session persists in localStorage
5. Navbar updates dynamically based on auth state

### Route Protection
- **Public Routes:** Login, Register
- **Protected Routes:** All dashboards and product pages (require login)
- **Admin Routes:** Admin dashboard, user management, product management (require admin role)

### Form Validations

#### Login Form
- Email: Required, must be valid email format
- Password: Required, minimum 6 characters

#### Register Form
- First Name: Required, minimum 2 characters
- Last Name: Required, minimum 2 characters
- Email: Required, valid email format, must be unique
- Password: Required, minimum 6 characters
- Confirm Password: Required, must match password
- Role: Required (User or Admin)

#### Product Form
- Title, Description, Brand, Category: Required
- Price, Stock: Required, must be positive numbers
- Discount, Rating: Optional

#### User Form (Admin Only)
- First Name, Last Name: Required, minimum 2 characters
- Email: Required, valid format, must be unique
- Password: Required for new users, optional for edit
- Role: Required

## Data Storage

### LocalStorage Keys
- `users_data` - Array of user objects
- `products_data` - Array of product objects
- `authenticated_user` - Current logged-in user

### Default Data
The application initializes with:
- 2 demo users (1 admin, 1 regular user)
- 3 demo products

All data persists in browser localStorage and survives page refreshes.

## Navigation Structure

```
/
├── /login                      # Login page (public)
├── /register                   # Registration page (public)
├── /user-dashboard             # User dashboard (auth required)
├── /admin-dashboard            # Admin dashboard (admin only)
├── /products                   # Products list (auth required)
├── /product/:id                # Product details (auth required)
├── /add-product                # Add product (admin only)
├── /edit-product/:id           # Edit product (admin only)
├── /admin/users/add            # Add user (admin only)
├── /admin/users/edit/:id       # Edit user (admin only)
└── /**                         # 404 error page
```

## Features Breakdown

### Admin Dashboard
- Statistics cards showing totals
- Tabbed interface for Users and Products
- Table views with action buttons
- Quick access to add/edit/delete operations

### User Dashboard
- Product catalog in card layout
- Displays product images, prices, discounts
- Rating and stock information
- View details button for each product

### Navbar (Dynamic)
- **Before Login:** Shows Login and Register links
- **After Login (User):** Shows Dashboard, Products, and User profile dropdown
- **After Login (Admin):** Shows Admin Dashboard, Products, and User profile dropdown
- Profile dropdown displays user info and logout option

## Styling

- Clean, modern UI using Bootstrap 5
- Responsive design for mobile and desktop
- Custom CSS enhancements
- Bootstrap Icons for visual elements
- Card-based layouts
- Hover effects on interactive elements

## Future Enhancements

Potential features for expansion:
- Search and filter functionality
- Shopping cart and checkout
- Product categories with filtering
- User profile management
- Image upload for products
- Order management system
- Email notifications
- Password reset functionality
- API integration (replacing mock service)

## Development Notes

- **Standalone Components:** Uses Angular standalone components (no NgModule)
- **Signals:** Implements Angular signals for reactive state
- **Type Safety:** Full TypeScript typing for all data models
- **Observables:** RxJS observables for async operations
- **Guards:** Functional route guards (Angular 15+ style)
- **Lazy Loading Ready:** Structure supports lazy loading modules

## License

This project is created for educational purposes.

## Author

ITI Full Stack .NET - Angular Course
