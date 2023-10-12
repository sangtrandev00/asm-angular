import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectCurrentUser,
  selectCurrentUserId,
} from 'src/app/auth/store/auth.selectors';

export const authorizationGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService); // Tại sao phải inject mà không phải khởi tạo lại
  const router = inject(Router);
  const store = inject(Store);
  const httpService = inject(HttpClient);

  let isAuthenticated = false;

  store.select(selectCurrentUserId).subscribe((currentUserId) => {
    // console.log('is current user id: ', currentUserId);
    // isAuthenticated = isAuth;
  });

  console.log('next guard', isAuthenticated);

  // if (isAuthenticated) {
  //   return isAuthenticated;
  // } else {
  //   router.navigate(['auth', 'login']);
  //   return false;
  // }
  return true;
};
