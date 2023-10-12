import { createReducer, on } from '@ngrx/store';
import { UsersActions, UsersApiActions } from './users.actions'; // Updated import
import { IUser } from 'src/app/models/User'; // Assuming you have an IUser interface for users.

export interface UserState {
  // Updated interface name
  users: IUser[]; // Updated property name
  isLoading: boolean;
  error: any;
  editingUserId: string; // Updated property name
  user: IUser | null;
}

export const initialState: UserState = {
  users: [], // Updated property name
  isLoading: false,
  error: null,
  editingUserId: '', // Updated property name
  user: null,
};

export const usersReducer = createReducer(
  // Updated reducer name
  initialState,
  on(UsersApiActions.getUserList, (_state) => {
    // Updated action name
    return {
      ...initialState,
      isLoading: true,
    };
  }),
  on(UsersApiActions.getUserListSuccess, (_state, { users }) => {
    // Updated action name
    return {
      ...initialState,
      users, // Updated property name
    };
  }),
  on(UsersApiActions.getUserListFailure, (_state, { error }) => {
    // Updated action name
    return {
      ...initialState,
      isLoading: false, // Updated property name
      error: error,
    };
  }),
  on(UsersApiActions.getUserById, (_state) => {
    // Updated action name
    return {
      ...initialState,
      isLoading: true,
    };
  }),
  on(UsersApiActions.getUserByIdSuccess, (_state, { user }) => {
    // Updated action name
    return {
      ...initialState,
      user, // Updated property name
    };
  }),
  on(UsersApiActions.getUserByIdFailure, (_state, { error }) => {
    // Updated action name
    return {
      ...initialState,
      isLoading: false, // Updated property name
      error: error,
    };
  }),
  on(UsersApiActions.addUser, (state) => ({
    // Updated action name
    ...state,
    isLoading: true,
  })), // Set loading to true on API request
  on(UsersApiActions.addUserSuccess, (state, { user }) => {
    // Updated action name

    console.log('User added: ', user);

    return {
      ...state,
      users: [...state.users, user], // Updated property name
      isLoading: false,
    };
  }),
  on(UsersApiActions.addUserFailure, (state, { error }) => ({
    // Updated action name
    ...state,
    isLoading: false,
    error: error,
  })),
  on(UsersApiActions.updateUser, (state) => ({
    // Updated action name
    ...state,
    isLoading: true,
  })), // Set loading to true on API request
  on(UsersApiActions.updateUserSuccess, (state, { user }) => {
    // Updated action name
    return {
      ...state,
      users: state.users.map(
        (
          usr // Updated property name
        ) => (usr._id === user._id ? user : usr) // Updated property name
      ),
      isLoading: false,
    };
  }),
  on(UsersApiActions.updateUserFailure, (state, { error }) => ({
    // Updated action name
    ...state,
    isLoading: false,
    error: error,
  })),
  on(UsersApiActions.deleteUser, (state) => ({
    // Updated action name
    ...state,
    isLoading: true,
  })),
  on(UsersApiActions.deleteUserSuccess, (state, { id }) => {
    // Updated action name
    return {
      ...state,
      users: state.users.filter((user) => user._id !== id), // Updated property name
      isLoading: false,
    };
  }),
  on(UsersApiActions.deleteUserFailure, (state, { error }) => ({
    // Updated action name
    ...state,
    isLoading: false,
    error: error,
  })),
  on(UsersActions.startEditUser, (state, { id }) => {
    console.log('start edit user:', id);

    // Updated action name
    return {
      ...state,
      editingUserId: id, // Updated property name
    };
  }),
  on(UsersActions.resetUser, (state) => {
    // Updated action name
    return {
      ...state,
      editingUserId: '', // Updated property name
    };
  })
);
