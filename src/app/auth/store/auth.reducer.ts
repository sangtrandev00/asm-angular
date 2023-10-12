import { createReducer, on } from '@ngrx/store';
import { AuthActions, AuthApiActions } from './auth.actions'; // Updated import
import { IOrder } from 'src/app/models/Order'; // Assuming you have an IOrder interface for orders.
import { IUser } from 'src/app/models/User';
import { inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface AuthState {
  // Updated interface name
  userId: string;
  user: IUser | null; // Updated property name
  isAuth: boolean;
  isLoading: boolean;
  role: string;
  error: any;
  token: string;
}

// const isAuth = localStorage.getItem('token');
const localToken = localStorage.getItem('token');

export const initialState: AuthState = {
  userId: '',
  user: null, // Updated property name
  isAuth: false,
  isLoading: false,
  error: null,
  token: localToken || '',
  role: '',
};

export const authReducer = createReducer(
  // Updated reducer name
  initialState,
  on(AuthApiActions.login, (state) => ({
    // Updated action name
    ...state,
    isLoading: true,
  })), // Set loading to true on API request
  on(AuthApiActions.loginSuccess, (state, { loginData }) => {
    // Updated action name
    return {
      ...state,
      isAuth: true,
      isLoading: false,
      token: loginData.token,
      userId: loginData.userId,
    };
  }),
  on(AuthApiActions.loginFailure, (state, { error }) => {
    // Updated action name
    return {
      ...state,
      isLoading: false, // Updated property name
      error: error,
    };
  }),
  on(AuthApiActions.register, (state) => ({
    // Updated action name
    ...state,
    isLoading: true,
  })), // Set loading to true on API request
  on(AuthApiActions.registerSuccess, (state, {}) => {
    // Updated action name
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(AuthApiActions.registerFailure, (state, { error }) => {
    // Updated action name
    return {
      ...state,
      isLoading: false, // Updated property name
      error: error,
    };
  }),
  on(AuthActions.setUnAuthenticated, (state) => {
    localStorage.removeItem('token');
    return {
      ...state,
      isAuth: false,
      token: '',
    };
  }),
  on(AuthActions.setAuthenticated, (state) => {
    return {
      ...state,
      isAuth: true,
    };
  }),
  on(AuthActions.setCurrentRole, (state, { role }) => {
    return {
      ...state,
      role: role,
    };
  })
);
