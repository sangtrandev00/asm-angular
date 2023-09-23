import { createReducer, on } from '@ngrx/store';
import { CategoriesActions, CategoriesApiActions } from './categories.actions';
import { ICategory } from 'src/app/models/Category';

export interface CategoryState {
  categories: ICategory[];
  isLoading: boolean;
  error: any;
  editingCategoryId: string;
}

export const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
  editingCategoryId: '',
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesApiActions.getCategoryList, (_state) => {
    return {
      ...initialState,
      isLoading: true,
    };
  }),
  on(CategoriesApiActions.getCategoryListSuccess, (_state, { categories }) => {
    return {
      ...initialState,
      categories,
    };
  }),
  on(CategoriesApiActions.getCategoryListFailure, (_state, { error }) => {
    return {
      ...initialState,
      isLoading: true,
      error: error,
    };
  }),
  on(CategoriesApiActions.addCategory, (state) => ({
    ...state,
    isLoading: true,
  })), // Set loading to true on API request
  on(CategoriesApiActions.addCategorySuccess, (state, { category }) => {
    return {
      ...state,
      categories: [...state.categories, category],
      isLoading: false,
    };
  }), // Add this line,
  on(CategoriesApiActions.addCategoryFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(CategoriesApiActions.updateCategory, (state) => ({
    ...state,
    isLoading: true,
  })), // Set loading to true on API request
  on(CategoriesApiActions.updateCategorySuccess, (state, { category }) => {
    const categoryExistingIdx = state.categories.findIndex(
      (cate) => cate._id === category._id
    );

    const updatedCategories = [...state.categories];

    updatedCategories[categoryExistingIdx] = category;

    return {
      ...state,
      categories: updatedCategories,
      isLoading: false,
    };
  }),
  on(CategoriesApiActions.updateCategoryFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(CategoriesApiActions.deleteCategory, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(CategoriesApiActions.deleteCategorySuccess, (state, { id }) => {
    console.log('category id: ', id);

    return {
      ...state,
      categories: state.categories.filter((category) => category._id !== id),
      isLoading: false,
    };
  }),
  on(CategoriesApiActions.deleteCategoryFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error: error,
    };
  }),
  on(CategoriesActions.startEditCategory, (state, { id }) => {
    return {
      ...state,
      editingCategoryId: id,
    };
  }),
  on(CategoriesActions.resetCategory, (state) => {
    return {
      ...state,
      editingCategoryId: '',
    };
  })
);
