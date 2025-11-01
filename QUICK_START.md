# Quick Start Guide

## Getting Started

### 1. Start the Development Server
```bash
npm start
```

The application will open at `http://localhost:4200/`

### 2. Login with Demo Credentials

You'll be redirected to the login page. Use these credentials:

#### Admin Access
- **Email:** `admin@ecommerce.com`
- **Password:** `admin123`

#### User Access
- **Email:** `user@ecommerce.com`
- **Password:** `user123`

### 3. Explore Features

#### As Admin:
1. **Admin Dashboard** - View statistics and manage data
2. **Products Tab** - Add, edit, delete, and view products
3. **Users Tab** - Add, edit, delete, and view users
4. **Full CRUD Operations** on both users and products

#### As User:
1. **User Dashboard** - Browse available products
2. **Product Details** - Click any product to view details
3. **View-Only Access** - Cannot modify data

### 4. Test Registration

1. Click "Register" from login page
2. Fill in the form:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john.doe@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
   - Role: Select `User` or `Admin`
3. Submit and get redirected to login
4. Login with your new credentials

### 5. Test Logout

1. Click on your name in the navbar (top right)
2. View your profile info in dropdown
3. Click "Logout"
4. Confirm logout

## Navigation Guide

### Public Pages (No Login Required)
- `/login` - Login page
- `/register` - Registration page

### User Pages (Login Required)
- `/user-dashboard` - User dashboard with product catalog
- `/products` - Product listing
- `/product/:id` - Individual product details

### Admin Pages (Admin Role Required)
- `/admin-dashboard` - Admin control panel
- `/add-product` - Add new product
- `/edit-product/:id` - Edit existing product
- `/admin/users/add` - Add new user
- `/admin/users/edit/:id` - Edit existing user

## Data Management

### Viewing Data
All data is stored in browser localStorage and can be viewed in:
- **Chrome DevTools:** Application → Local Storage → http://localhost:4200
- **Keys:** `users_data`, `products_data`, `authenticated_user`

### Resetting Data
To reset to default data:
1. Open browser console (F12)
2. Run: `localStorage.clear()`
3. Refresh the page

### Adding Custom Data

#### Add a Product (Admin):
1. Login as admin
2. Navigate to Admin Dashboard
3. Click "Products" tab
4. Click "Add New Product"
5. Fill in all fields
6. Click "Create Product"

#### Add a User (Admin):
1. Login as admin
2. Navigate to Admin Dashboard
3. Click "Users" tab
4. Click "Add New User"
5. Fill in all fields
6. Select role (User or Admin)
7. Click "Create User"

## Troubleshooting

### Issue: Can't login
- **Solution:** Ensure you're using correct credentials
- **Check:** Caps Lock is off
- **Default accounts:** See demo credentials above

### Issue: Redirected to 404
- **Solution:** URL might be incorrect
- **Fix:** Use navbar navigation

### Issue: Can't access admin pages
- **Solution:** Login as admin user
- **Reason:** Regular users don't have admin access

### Issue: Data not persisting
- **Solution:** Check browser localStorage is enabled
- **Fix:** Clear browser cache and try again

### Issue: Changes not reflecting
- **Solution:** Refresh the page
- **Reason:** Sometimes localStorage needs refresh

## Features to Try

### 1. Authentication
- ✅ Register new user
- ✅ Login with credentials
- ✅ View profile in dropdown
- ✅ Logout

### 2. Product Management (Admin)
- ✅ View all products
- ✅ Add new product
- ✅ Edit existing product
- ✅ Delete product
- ✅ View product details

### 3. User Management (Admin)
- ✅ View all users
- ✅ Add new user
- ✅ Edit existing user
- ✅ Delete user
- ✅ Assign roles

### 4. Role-Based Access
- ✅ Try accessing admin routes as regular user
- ✅ Try accessing protected routes without login
- ✅ Compare admin vs user navbar

### 5. Form Validations
- ✅ Try submitting empty forms
- ✅ Try invalid email format
- ✅ Try password mismatch on register
- ✅ Try weak password (less than 6 chars)

## Tips

1. **Use Admin Account** to explore all features
2. **Open DevTools** to see localStorage data
3. **Try Different Roles** to see access differences
4. **Test Validations** by entering invalid data
5. **Clear Data** anytime by clearing localStorage

## Need Help?

Check the full documentation in `PROJECT_DOCUMENTATION.md` for detailed information about:
- Architecture
- Components
- Services
- Guards
- Routing
- Data models
- And more!

---

**Enjoy exploring the application! 🚀**
