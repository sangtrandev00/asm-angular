import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer'; // Updated import
import { IOrder } from 'src/app/models/Order'; // Assuming you have an IOrder interface for orders.

// Create a feature selector for the AuthState // Updated comment and type
export const selectAuthState = createFeatureSelector<AuthState>('auth'); // Updated feature selector name and type

// Create selectors for specific properties within the AuthState // Updated comment
export const selectCurrentUser = createSelector(selectAuthState, (state) => {
  console.log('state: ', state);

  return state.user; // Updated property name
});

export const selectIsAuth = createSelector(selectAuthState, (state) => {
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
