import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AuthApiActions } from './auth.actions'; // Updated import
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService, // Updated service name
    private toastr: ToastrService
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
            this.toastr.success('Register', 'Register successfully!');

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
