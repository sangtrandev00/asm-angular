import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { UsersApiActions } from './users.actions'; // Updated import
import { UserService } from 'src/app/core/services/user.service'; // Updated import
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserEffects {
  // Updated class name
  constructor(
    private actions$: Actions,
    private userService: UserService, // Updated service name,
    private toastr: ToastrService
  ) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersApiActions.getUserList), // Updated action name
      switchMap(() =>
        this.userService.getUsers().pipe(
          // Updated service name
          map(
            (usersResponse) =>
              UsersApiActions.getUserListSuccess({ users: usersResponse.users }) // Updated action name
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
          map((newUserResponse) => {
            console.log('action user: ', action.user);

            console.log('addd user', newUserResponse);

            // Add user toast here ???
            this.toastr.success('User added ', 'Add User Successfully');

            return UsersApiActions.addUserSuccess({
              // Updated action name
              user: newUserResponse.user, // Updated property name
            });
          }),
          catchError((error) => {
            this.toastr.error('User not added ', 'Add User Failed');

            return of(UsersApiActions.addUserFailure({ error })); // Updated action name
          })
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
          map((userResponse) => {
            return UsersApiActions.getUserByIdSuccess({
              user: userResponse.user,
            }); // Updated action name
          }),
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
          map((userResponse) => {
            this.toastr.success('User updated ', 'Update User Successfully');

            return UsersApiActions.updateUserSuccess({
              user: userResponse.user,
            }); // Updated action name
          }),
          catchError((error) => {
            this.toastr.error('User not updated ', 'Update User Failed');

            return of(UsersApiActions.updateUserFailure({ error })); // Updated action name
          })
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
          map(() => {
            this.toastr.success(
              'User deleted ',
              `Delete User #${action.id} Successfully`
            );

            return UsersApiActions.deleteUserSuccess({ id: action.id }); // Updated action name
          }),
          catchError((error) => {
            this.toastr.error(
              'User not deleted ',
              `Delete User #${action.id} Successfully`
            );

            return of(UsersApiActions.deleteUserFailure({ error })); // Updated action name
          })
        )
      )
    )
  );
}
