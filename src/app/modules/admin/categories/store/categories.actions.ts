import { createAction, createActionGroup, props } from '@ngrx/store';
import { ICategory } from '../../../../models/Category';

// Define action group for regular post actions (not API-related)
export const CategoriesActions = createActionGroup({
  source: 'Categories',
  events: {
    'Add Category': props<{ category: ICategory }>(),
    'Remove Category': props<{ id: string }>(),
    'Start Edit Category': props<{ id: string }>(),
    'Reset Category': () => ({ payload: {} }),
  },
});

// Define action group for API-related post actions
export const CategoriesApiActions = createActionGroup({
  source: 'Categories API',
  events: {
    'Get Category List': props<{
      categories: ICategory[];
    }>(),
    'Get Category List Success': props<{
      categories: ICategory[];
    }>(),
    'Get Category List Failure': props<{ error: any }>(),
    'Add Category': props<{ category: Omit<ICategory, '_id'> }>(),
    'Add Category Success': props<{ category: ICategory }>(), // Action for success
    'Add Category Failure': props<{ error: any }>(), // Action for failure
    'Get Category By Id': props<{ categoryId: string }>(),
    'Get Category By Id Success': props<{ category: Omit<ICategory, '_id'> }>(),
    'Get Category By Id Failure': props<{ error: any }>(),
    'Update Category': props<{
      id: string;
      category: Omit<ICategory, '_id'>;
    }>(),
    'Update Category Success': props<{ category: ICategory }>(), // Action for success
    'Update Category Failure': props<{ error: any }>(), // Action for failure
    'Delete Category': props<{ id: string }>(),
    'Delete Category Success': props<{ id: string }>(),
    'Delete Category Failure': props<{ error: any }>(),
  },
});
