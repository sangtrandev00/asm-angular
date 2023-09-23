import { createAction, createActionGroup, props } from '@ngrx/store';
import { IOrder } from '../../../../models/Order'; // Assuming you have an IOrder interface for orders.

// Define action group for regular order actions (not API-related)
export const OrdersActions = createActionGroup({
  source: 'Orders', // Updated source name
  events: {
    'Add Order': props<{ order: IOrder }>(), // Updated action name and property
    'Remove Order': props<{ id: string }>(), // Updated action name and property
    'Start Edit Order': props<{ id: string }>(), // Updated action name and property
    'Reset Order': () => ({ payload: {} }), // Updated action name and property
  },
});

// Define action group for API-related order actions
export const OrdersApiActions = createActionGroup({
  source: 'Orders API', // Updated source name
  events: {
    'Get Order List': props<{
      orders: IOrder[]; // Updated property name
    }>(),
    'Get Order List Success': props<{
      orders: IOrder[]; // Updated property name
    }>(),
    'Get Order List Failure': props<{ error: any }>(), // Updated action name
    'Add Order': props<{ order: Omit<IOrder, '_id'> }>(), // Updated action name and property
    'Add Order Success': props<{ order: IOrder }>(), // Updated action name and property
    'Add Order Failure': props<{ error: any }>(), // Updated action name and property
    'Get Order By Id': props<{ orderId: string }>(), // Updated action name and property
    'Get Order By Id Success': props<{ order: Omit<IOrder, '_id'> }>(), // Updated action name and property
    'Get Order By Id Failure': props<{ error: any }>(), // Updated action name and property
    'Update Order': props<{ id: string; order: Omit<IOrder, '_id'> }>(), // Updated action name and property
    'Update Order Success': props<{ order: IOrder }>(), // Updated action name and property
    'Update Order Failure': props<{ error: any }>(), // Updated action name and property
    'Delete Order': props<{ id: string }>(), // Updated action name and property
    'Delete Order Success': props<{ id: string }>(), // Updated action name and property
    'Delete Order Failure': props<{ error: any }>(), // Updated action name and property
  },
});
