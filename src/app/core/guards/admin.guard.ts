import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin) {
    return true; // Access granted
  } else {
    alert('Access Denied: Admins only!');
    router.navigate(['/products']); // Access denied, redirect
    return false;
  }
};

// export const userGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if (!authService.isAdmin) {
//     return true; // Access granted
//   } else {
//     alert('Access Denied: Users only!');
//     router.navigate(['/admin']); // Access denied, redirect
//     return false;
//   }
// };