import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './users.reducer'; // Updated import
import { IUser } from 'src/app/models/User'; // Assuming you have an IUser interface for users.

// Create a feature selector for the UserState // Updated comment and type
export const selectUserState = createFeatureSelector<UserState>('users'); // Updated feature selector name and type

// Create selectors for specific properties within the UserState // Updated comment
export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users // Updated property name
);

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.user // Updated property name
);

export const selectLoading = createSelector(
  selectUserState,
  (state) => state.isLoading
);

export const selectEditingUserId = createSelector(
  selectUserState,
  (state) => state.editingUserId // Updated property name
);
