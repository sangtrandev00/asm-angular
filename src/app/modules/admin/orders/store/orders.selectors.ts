import { createSelector, createFeatureSelector } from '@ngrx/store';
import { OrderState } from './orders.reducer'; // Updated import
import { IOrder } from 'src/app/models/Order'; // Assuming you have an IOrder interface for orders.

// Create a feature selector for the OrderState // Updated comment and type
export const selectOrderState = createFeatureSelector<OrderState>('orders'); // Updated feature selector name and type

// Create selectors for specific properties within the OrderState // Updated comment
export const selectOrders = createSelector(selectOrderState, (state) => {
  console.log('state: ', state);

  return state.orders; // Updated property name
});

export const selectLoading = createSelector(
  selectOrderState,
  (state) => state.isLoading
);

export const selectEditingOrderId = createSelector(
  selectOrderState,
  (state) => state.editingOrderId // Updated property name
);
