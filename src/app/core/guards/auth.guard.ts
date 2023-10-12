import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { selectIsAuth } from 'src/app/auth/store/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService); // Tại sao phải inject mà không phải khởi tạo lại
  const router = inject(Router);
  const store = inject(Store);

  let isAuthenticated = false;

  store.select(selectIsAuth).subscribe((isAuth) => {
    console.log('is auth at guard ', isAuth);
    isAuthenticated = isAuth;
  });

  console.log('next guard', isAuthenticated);

  if (isAuthenticated) {
    return isAuthenticated;
  } else {
    router.navigate(['auth', 'login']);
    return false;
  }
};
