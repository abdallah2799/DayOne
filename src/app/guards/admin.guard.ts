import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn && authService.isAdmin) {
    return true;
  }

  if (authService.isLoggedIn) {
    // User is logged in but not admin, redirect to products
    router.navigate(['/products']);
    return false;
  }

  // Not logged in, redirect to login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
