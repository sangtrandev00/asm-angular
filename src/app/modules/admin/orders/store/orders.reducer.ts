import { createReducer, on } from '@ngrx/store';
import { OrdersActions, OrdersApiActions } from './orders.actions'; // Updated import
import { IOrder } from 'src/app/models/Order'; // Assuming you have an IOrder interface for orders.

export interface OrderState {
  // Updated interface name
  orders: IOrder[]; // Updated property name
  isLoading: boolean;
  error: any;
  editingOrderId: string; // Updated property name
}

export const initialState: OrderState = {
  orders: [], // Updated property name
  isLoading: false,
  error: null,
  editingOrderId: '', // Updated property name
};

export const ordersReducer = createReducer(
  // Updated reducer name
  initialState,
  on(OrdersApiActions.getOrderList, (_state) => {
    // Updated action name
    return {
      ...initialState,
      isLoading: true,
    };
  }),
  on(OrdersApiActions.getOrderListSuccess, (_state, { orders }) => {
    // Updated action name
    return {
      ...initialState,
      orders, // Updated property name
      isLoading: false,
    };
  }),
  on(OrdersApiActions.getOrderListFailure, (_state, { error }) => {
    // Updated action name
    return {
      ...initialState,
      isLoading: false, // Updated property name
      error: error,
    };
  }),
  on(OrdersApiActions.addOrder, (state) => ({
    // Updated action name
    ...state,
    isLoading: true,
  })), // Set loading to true on API request
  on(OrdersApiActions.addOrderSuccess, (state, { order }) => {
    // Updated action name
    return {
      ...state,
      orders: [...state.orders, order], // Updated property name
      isLoading: false,
    };
  }),
  on(OrdersApiActions.updateOrder, (state) => ({
    // Updated action name
    ...state,
    isLoading: true,
  })), // Set loading to true on API request
  on(OrdersApiActions.updateOrderSuccess, (state, { order }) => {
    // Updated action name
    return {
      ...state,
      orders: state.orders.map(
        (
          ord // Updated property name
        ) => (ord._id === order._id ? order : ord) // Updated property name
      ),
      isLoading: false,
    };
  }),
  on(OrdersApiActions.deleteOrder, (state) => ({
    // Updated action name
    ...state,
    isLoading: true,
  })),
  on(OrdersApiActions.deleteOrderSuccess, (state, { id }) => {
    // Updated action name
    return {
      ...state,
      orders: state.orders.filter((order) => order._id !== id), // Updated property name
      isLoading: false,
    };
  }),
  on(OrdersActions.startEditOrder, (state, { id }) => {
    // Updated action name
    return {
      ...state,
      editingOrderId: id, // Updated property name
    };
  }),
  on(OrdersActions.resetOrder, (state) => {
    // Updated action name
    return {
      ...state,
      editingOrderId: '', // Updated property name
    };
  })
);
