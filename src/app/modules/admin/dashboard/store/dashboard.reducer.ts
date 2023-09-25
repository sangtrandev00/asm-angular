import { createReducer, on } from '@ngrx/store';
import { DashboardApiActions } from './dashboard.actions'; // Updated import
import { IReport } from 'src/app/models/Report';

export interface DashboardState {
  // Updated interface name
  reports: IReport; // Updated property name
  isLoading: boolean;
  error: any;
}

export const initialState: DashboardState = {
  reports: {
    orders: 0,
    products: 0,
    users: 0,
    categories: 0,
    totalRevenue: 0,
  }, // Updated property name
  isLoading: false,
  error: null,
};

export const dashboardReducer = createReducer(
  // Updated reducer name
  initialState,
  on(DashboardApiActions.getReports, (_state) => {
    // Updated action name
    return {
      ...initialState,
      isLoading: true,
    };
  }),
  on(DashboardApiActions.getReportsSuccess, (_state, { reports }) => {
    // Updated action name
    return {
      ...initialState,
      reports, // Updated property name
    };
  }),
  on(DashboardApiActions.getReportsFailure, (_state, { error }) => {
    // Updated action name
    return {
      ...initialState,
      isLoading: false, // Updated property name
      error: error,
    };
  })
);
