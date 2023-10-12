import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import {
  selectCurrentUser,
  selectCurrentUserId,
} from 'src/app/auth/store/auth.selectors';

export const authorizationGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService); // Tại sao phải inject mà không phải khởi tạo lại
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const activateRoute = inject(ActivatedRoute);
  const store = inject(Store);
  const httpService = inject(HttpClient);
  let isAuthenticated = false;

  const jwtHelper = inject(JwtHelperService);
  const localToken = localStorage.getItem('token');

  const decodeToken = jwtHelper.decodeToken(localToken as string);
  const currentPath = window.location.pathname;
  console.log('Current Route: ', currentPath);

  // if (isAuthenticated) {
  //   return isAuthenticated;
  // } else {
  //   router.navigate(['auth', 'login']);
  //   return false;
  // }
  const currentRole = decodeToken.role;

  if (currentRole === 'client') {
    toastr.warning('You are not authorize for this role');
    router.navigate(['auth', 'login']);
    return false;
  } else if (currentRole === 'subadmin') {
  } else if (currentRole === 'admin') {
  }

  return true;
};

export const isAdminGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService); // Tại sao phải inject mà không phải khởi tạo lại
  const router = inject(Router);
  const store = inject(Store);
  const httpService = inject(HttpClient);
  const toastr = inject(ToastrService);

  let isAuthenticated = false;

  const jwtHelper = inject(JwtHelperService);
  const localToken = localStorage.getItem('token');

  const decodeToken = jwtHelper.decodeToken(localToken as string);

  if (decodeToken.role === 'admin') {
    return true;
  } else {
    console.log('you are not authorize for this role (only for admin)!');
    toastr.warning('You are not authorize for this role');
    return false;
  }
};

export const isSubAdminGuard: CanActivateFn = (route, state) => {
  // const authService = inject(AuthService); // Tại sao phải inject mà không phải khởi tạo lại
  const router = inject(Router);
  const store = inject(Store);
  const httpService = inject(HttpClient);
  const toastr = inject(ToastrService);
  let isAuthenticated = false;

  const jwtHelper = inject(JwtHelperService);
  const localToken = localStorage.getItem('token');

  const decodeToken = jwtHelper.decodeToken(localToken as string);

  if (decodeToken.role === 'subadmin' || decodeToken.role === 'admin') {
    return true;
  } else {
    console.log(
      'you are not authorize for this role (only for subadmin and admin)!'
    );
    toastr.warning('You are not authorize for this role');
    return false;
  }
};
