import { createAction, createActionGroup, props } from '@ngrx/store';
import { IUser } from '../../../../models/User'; // Assuming you have an IUser interface for users.

// Define action group for regular user actions (not API-related)
export const UsersActions = createActionGroup({
  source: 'Users', // Updated source name
  events: {
    'Add User': props<{ user: IUser }>(), // Updated action name and property
    'Remove User': props<{ id: string }>(), // Updated action name and property
    'Start Edit User': props<{ id: string }>(), // Updated action name and property
    'Reset User': () => ({ payload: {} }), // Updated action name and property,
  },
});

// Define action group for API-related user actions
export const UsersApiActions = createActionGroup({
  source: 'Users API', // Updated source name
  events: {
    'Get User List': props<{
      users: IUser[]; // Updated property name
    }>(),
    'Get User List Success': props<{
      users: IUser[]; // Updated property name
    }>(),
    'Get User List Failure': props<{ error: any }>(), // Updated action name
    'Add User': props<{ user: Omit<IUser, '_id'> }>(), // Updated action name and property
    'Add User Success': props<{ user: IUser }>(), // Updated action name and property
    'Add User Failure': props<{ error: any }>(), // Updated action name and property
    'Get User By Id': props<{ userId: string }>(), // Updated action name and property
    'Get User By Id Success': props<{ user: Omit<IUser, '_id'> }>(), // Updated action name and property
    'Get User By Id Failure': props<{ error: any }>(), // Updated action name and property
    'Update User': props<{ id: string; user: Omit<IUser, '_id'> }>(), // Updated action name and property
    'Update User Success': props<{ user: IUser }>(), // Updated action name and property
    'Update User Failure': props<{ error: any }>(), // Updated action name and property
    'Delete User': props<{ id: string }>(), // Updated action name and property
    'Delete User Success': props<{ id: string }>(), // Updated action name and property
    'Delete User Failure': props<{ error: any }>(), // Updated action name and property
  },
});
