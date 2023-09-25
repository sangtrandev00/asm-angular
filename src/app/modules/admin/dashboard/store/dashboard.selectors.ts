import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer'; // Updated import

// Create a feature selector for the DashboardState // Updated comment
export const selectDashboardState =
  createFeatureSelector<DashboardState>('dashboard'); // Updated feature selector name

// Create selectors for specific properties within the DashboardState
export const selectReports = createSelector(
  selectDashboardState,
  (state) => state.reports // Updated property name
);

export const selectLoading = createSelector(
  selectDashboardState,
  (state) => state.isLoading
);
