import { createAction, createActionGroup, props } from '@ngrx/store';
// import { IOrder } from '../../../../models/Order'; // Assuming you have an IOrder interface for orders.

// Define action group for regular order actions (not API-related)
export const AuthActions = createActionGroup({
  source: 'Auth', // Updated source name
  events: {
    // 'Add Order': props<{ order: IOrder }>(), // Updated action name and property
    // 'Remove Order': props<{ id: string }>(), // Updated action name and property
    // 'Start Edit Order': props<{ id: string }>(), // Updated action name and property
    // 'Reset Order': () => ({ payload: {} }), // Updated action name and property
    setUnAuthenticated: () => ({ payload: {} }), // set unauthenticated
    setAuthenticated: () => ({ payload: {} }), // set unauthenticated
  },
});

// Define action group for API-related order actions
export const AuthApiActions = createActionGroup({
  source: 'Auth API', // Updated source name
  events: {
    Login: props<{ loginData: { email: string; password: string } }>(), // Updated action name and property
    'Login Success': props<{
      loginData: { userId: string; token: string; message: string };
    }>(), // Updated action name and property
    'Login Failure': props<{ error: any }>(), // Updated action name and property
    Register: props<{
      signupData: { name: string; password: string; email: string };
    }>(), // Updated action name andso property
    'Register Success': props<{
      signupData: { userId: string; message: string };
    }>(), // Updated action name and property
    'Register Failure': props<{ error: any }>(), // Updated action name and property
  },
});
