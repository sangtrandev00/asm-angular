import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './products.reducer'; // Updated import
import { IProduct } from 'src/app/models/Product'; // Assuming you have an IProduct interface for products.

// Create a feature selector for the ProductState // Updated comment
export const selectProductState =
  createFeatureSelector<ProductState>('products'); // Updated feature selector name

// Create selectors for specific properties within the ProductState
export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products // Updated property name
);

export const selectLoading = createSelector(
  selectProductState,
  (state) => state.isLoading
);

export const selectEditingProductId = createSelector(
  selectProductState,
  (state) => state.editingProductId // Updated property name
);
