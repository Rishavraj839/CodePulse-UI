import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.user();

  if (!user) {
    // navigate back to login page
    router.navigate(['/login']);
    return false;
  }

  // User is logged in

  // Check role of user
  const isWriter = user.roles.includes("writer");

  if (!isWriter) {
    authService.logout();
    return false;
  }

  // we know that user is logged in and a writer role
  return true;
};
