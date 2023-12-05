import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LocalStorageKeys } from 'src/app/shared/enums/enums';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (localStorage.getItem(LocalStorageKeys.TOKEN)) {
    return true;
  }

  return router.parseUrl('/signin');
};
