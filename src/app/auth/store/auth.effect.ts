import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthActions, AuthApiActions } from './auth.actions'; // Updated import
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService, // Updated service name
    private toastr: ToastrService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private store: Store
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.login), // Updated action name
      switchMap((action) =>
        this.authService.login(action.loginData).pipe(
          map((loginResponse) => {
            // Add order toast here ???
            this.toastr.success('Login', 'Login Successfully');

            console.log('login response: ', loginResponse);

            const currentRole = this.jwtHelper.decodeToken(
              loginResponse.token
            ).role;

            this.store.dispatch(
              AuthActions.setCurrentRole({ role: currentRole })
            );

            this.router.navigate(['admin', 'dashboard']);

            return AuthApiActions.loginSuccess({
              loginData: loginResponse, // Updated property name
            });
          }),
          catchError((error) => {
            this.toastr.error(
              'Login failed',
              'Something went wrong! Can not login to server'
            );

            return of(AuthApiActions.loginFailure({ error })); // Updated action name
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthApiActions.register), // Updated action name
      switchMap((action) =>
        this.authService.signUp(action.signupData).pipe(
          map((orderResponse) => {
            this.toastr.success(
              'Register',
              'Register successfully! Go to Login '
            );
            this.router.navigate(['admin', 'login']);

            return AuthApiActions.registerSuccess({
              signupData: orderResponse,
            }); // Updated action name
          }),
          catchError((error) => {
            this.toastr.error('Register', 'Register failed');

            return of(AuthApiActions.loginFailure({ error })); // Updated action name
          })
        )
      )
    )
  );
}
