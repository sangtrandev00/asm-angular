import { createReducer, on } from '@ngrx/store';
import { ProductsActions, ProductsApiActions } from './products.actions'; // Updated import
import { IProduct } from 'src/app/models/Product'; // Assuming you have an IProduct interface for products.

export interface ProductState {
  // Updated interface name
  products: ReadonlyArray<IProduct>; // Updated property name
  isLoading: boolean;
  error: any;
  editingProductId: string; // Updated property name
}

export const initialState: ProductState = {
  products: [], // Updated property name
  isLoading: false,
  error: null,
  editingProductId: '', // Updated property name
};

export const productsReducer = createReducer(
  // Updated reducer name
  initialState,
  on(ProductsApiActions.getProductList, (_state) => {
    // Updated action name
    return {
      ...initialState,
      isLoading: true,
    };
  }),
  on(ProductsApiActions.getProductListSuccess, (_state, { products }) => {
    // Updated action name
    return {
      ...initialState,
      products, // Updated property name
    };
  }),
  on(ProductsApiActions.getProductListFailure, (_state, { error }) => {
    // Updated action name
    return {
      ...initialState,
      isLoading: false, // Updated property name
      error: error,
    };
  }),
  on(ProductsApiActions.addProduct, (state) => ({
    // Updated action name
    ...state,
    isLoading: true,
  })), // Set loading to true on API request
  on(ProductsApiActions.addProductSuccess, (state, { product }) => {
    // Updated action name
    return {
      ...state,
      products: [...state.products, product], // Updated property name
      isLoading: false,
    };
  }),
  on(ProductsApiActions.updateProduct, (state) => ({
    // Updated action name
    ...state,
    isLoading: true,
  })), // Set loading to true on API request
  on(ProductsApiActions.updateProductSuccess, (state, { product }) => {
    // Updated action name
    return {
      ...state,
      products: state.products.map(
        (
          prod // Updated property name
        ) => (prod._id === product._id ? product : prod) // Updated property name
      ),
      isLoading: false,
    };
  }),
  on(ProductsApiActions.deleteProduct, (state) => ({
    // Updated action name
    ...state,
    isLoading: true,
  })),
  on(ProductsApiActions.deleteProductSuccess, (state, { id }) => {
    // Updated action name
    return {
      ...state,
      products: state.products.filter((product) => product._id !== id), // Updated property name
      isLoading: false,
    };
  }),
  on(ProductsActions.startEditProduct, (state, { id }) => {
    // Updated action name
    return {
      ...state,
      editingProductId: id, // Updated property name
    };
  }),
  on(ProductsActions.resetProduct, (state) => {
    // Updated action name
    return {
      ...state,
      editingProductId: '', // Updated property name
    };
  })
);
