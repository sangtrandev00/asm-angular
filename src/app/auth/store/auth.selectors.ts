import { createSelector, createFeatureSelector, Store } from '@ngrx/store';
import { AuthState } from './auth.reducer'; // Updated import
import { IOrder } from 'src/app/models/Order'; // Assuming you have an IOrder interface for orders.
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { selectUsers } from 'src/app/modules/admin/users/store/users.selectors';
import { IUser } from 'src/app/models/User';

// Create a feature selector for the AuthState // Updated comment and type
export const selectAuthState = createFeatureSelector<AuthState>('auth'); // Updated feature selector name and type

// Create selectors for specific properties within the AuthState // Updated comment
export const selectCurrentUser = createSelector(selectAuthState, (state) => {
  return state.user; // Updated property name
});

export const selectCurrentUserId = createSelector(selectAuthState, (state) => {
  const jwtHelper = inject(JwtHelperService);
  const token = state.token;
  const { userId } = jwtHelper.decodeToken(token);
  return userId; // Updated property name
});

export const selectIsAuth = createSelector(selectAuthState, (state) => {
  console.log('state: ', state);

  return state.isAuth; // Updated property name
});

// Role for authorization
export const selectCurrentRole = createSelector(selectAuthState, (state) => {
  console.log('state: ', state);

  return state.isAuth; // Updated property name
});

export const selectLoading = createSelector(
  selectAuthState,
  (state) => state.isLoading
);

// export const selectEditingOrderId = createSelector(
//   selectAuthState,
//   (state) => state.editingOrderId // Updated property name
// );
