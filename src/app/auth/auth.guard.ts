// This guard checks if the user is authenticated by verifying the presence of a token.
// If the token is not present, it redirects the user to the login page.
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.hasToken() || (router.navigate(['/login']), false);
};