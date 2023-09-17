import { createSelector, createFeatureSelector } from '@ngrx/store';
// import { Book } from '../book-list/books.model';
// import { IPost } from '../types/Post';
import { CategoryState } from './categories.reducer';

// export const selectCategories = createFeatureSelector<ReadonlyArray<IPost>>('posts');
// Create a feature selector for the CategoryState
export const selectCategoryState = createFeatureSelector<CategoryState>('blog');

// Create selectors for specific properties within the CategoryState
export const selectCategories = createSelector(
  selectCategoryState,
  (state) => state.categories
);

export const selectLoading = createSelector(
  selectCategoryState,
  (state) => state.isLoading
);

export const selectEditingCategoryId = createSelector(
  selectCategoryState,
  (state) => state.editingCategoryId
);

// export const selectEditingCategoryId =
//   createFeatureSelector<string>('editingCategoryId');

// export const selectCollectionState =
//   createFeatureSelector<ReadonlyArray<string>>('collection');

// Tại sao có book selector mà không có collection selector ???
// export const selectBookCollection = createSelector(
//   selectCategories,
//   selectCollectionState,
//   (posts, collection) => {
//     return collection.map((id) => posts.find((book) => book.id === id)!);
//   }
// );

// Chưa hiểu lắm nguyên lý tại sao phải làm như vậy. Tại sao select một lúc book và collection ở đây ?
// Giả sử select thêm nhiều cái thì ntn ?

// Khi nào nên select lấy cái trên store xuống nhỉ ?
