import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (localStorage.getItem('login')) {
    return true;
  }

  return router.navigate(['login']);
};
