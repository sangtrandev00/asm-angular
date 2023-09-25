import { createAction, createActionGroup, props } from '@ngrx/store';
import { IReport } from 'src/app/models/Report';

// Define action group for regular post actions (not API-related)
export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Add Product': props<{ product: IReport }>(),
    'Remove Product': props<{ id: string }>(),
    'Start Edit Product': props<{ id: string }>(),
    'Reset Product': () => ({ payload: {} }),
  },
});

// Define action group for API-related post actions
export const DashboardApiActions = createActionGroup({
  source: 'Dashboard API',
  events: {
    'Get Reports': props<{
      reports: IReport;
    }>(),
    'Get Reports Success': props<{
      reports: IReport;
    }>(),
    'Get Reports Failure': props<{ error: any }>(),
  },
});
