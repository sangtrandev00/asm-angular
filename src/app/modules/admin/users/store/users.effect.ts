import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UsersApiActions } from './users.actions'; // Updated import
import { UserService } from 'src/app/core/services/user.service'; // Updated import

@Injectable()
export class UserEffects {
  // Updated class name
  constructor(
    private actions$: Actions,
    private userService: UserService // Updated service name
  ) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.getUserList), // Updated action name
      switchMap(() =>
        this.userService.getUsers().pipe(
          // Updated service name
          map(
            (users) => UsersApiActions.getUserListSuccess({ users }) // Updated action name
          ),
          catchError(
            (error) => of(UsersApiActions.getUserListFailure({ error })) // Updated action name
          )
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.addUser), // Updated action name
      switchMap((action) =>
        this.userService.addUser(action.user).pipe(
          // Updated service name and action name
          map((newUser) => {
            return UsersApiActions.addUserSuccess({
              // Updated action name
              user: newUser, // Updated property name
            });
          }),
          catchError(
            (error) => of(UsersApiActions.addUserFailure({ error })) // Updated action name
          )
        )
      )
    )
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.getUserById), // Updated action name
      switchMap((action) =>
        this.userService.getUserById(action.userId).pipe(
          // Updated service name and action name
          map(
            (user) => UsersApiActions.getUserByIdSuccess({ user }) // Updated action name
          ),
          catchError(
            (error) => of(UsersApiActions.getUserByIdFailure({ error })) // Updated action name
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.updateUser), // Updated action name
      switchMap((action) =>
        this.userService.updateUser(action.id, action.user).pipe(
          // Updated service name and action name
          map(
            (user) => UsersApiActions.updateUserSuccess({ user }) // Updated action name
          ),
          catchError(
            (error) => of(UsersApiActions.updateUserFailure({ error })) // Updated action name
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.deleteUser), // Updated action name
      switchMap((action) =>
        this.userService.deleteUser(action.id).pipe(
          // Updated service name and action name
          map(
            () => UsersApiActions.deleteUserSuccess({ id: action.id }) // Updated action name
          ),
          catchError(
            (error) => of(UsersApiActions.deleteUserFailure({ error })) // Updated action name
          )
        )
      )
    )
  );
}
