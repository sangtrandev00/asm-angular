import { createAction, createActionGroup, props } from '@ngrx/store';
import { IProduct } from '../../../../models/Product'; // Assuming you have a IProduct interface for products.

// Define action group for regular post actions (not API-related)
export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Add Product': props<{ product: IProduct }>(),
    'Remove Product': props<{ id: string }>(),
    'Start Edit Product': props<{ id: string }>(),
    'Reset Product': () => ({ payload: {} }),
  },
});

// Define action group for API-related post actions
export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Get Product List': props<{
      products: ReadonlyArray<IProduct>;
    }>(),
    'Get Product List Success': props<{
      products: ReadonlyArray<IProduct>;
    }>(),
    'Get Product List Failure': props<{ error: any }>(),
    'Add Product': props<{ product: Omit<IProduct, 'id'> }>(),
    'Add Product Success': props<{ product: IProduct }>(), // Action for success
    'Add Product Failure': props<{ error: any }>(), // Action for failure
    'Get Product By Id': props<{ productId: string }>(),
    'Get Product By Id Success': props<{ product: Omit<IProduct, 'id'> }>(),
    'Get Product By Id Failure': props<{ error: any }>(),
    'Update Product': props<{ id: string; product: Omit<IProduct, 'id'> }>(),
    'Update Product Success': props<{ product: IProduct }>(), // Action for success
    'Update Product Failure': props<{ error: any }>(), // Action for failure
    'Delete Product': props<{ id: string }>(),
    'Delete Product Success': props<{ id: string }>(),
    'Delete Product Failure': props<{ error: any }>(),
  },
});
