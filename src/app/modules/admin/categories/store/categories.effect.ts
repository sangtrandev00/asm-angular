import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

// import { CategoriesApiActions } from '../state/blogs.actions';
import { CategoriesApiActions } from './categories.actions';
import { CategoryService } from 'src/app/core/services/category.service';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private categoryService: CategoryService
  ) {}

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesApiActions.getCategoryList),
      switchMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories) =>
            CategoriesApiActions.getCategoryListSuccess({ categories })
          ),
          catchError((error) =>
            of(CategoriesApiActions.getCategoryListFailure({ error }))
          )
        )
      )
    )
  );

  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesApiActions.addCategory),
      // Hàm switchMap là gì ?, có chức năng ra sao ?
      switchMap((action) =>
        this.categoryService.addCategory(action.category).pipe(
          map((newCateogry) => {
            return CategoriesApiActions.addCategorySuccess({
              category: newCateogry,
            });
          }),
          catchError((error) =>
            of(CategoriesApiActions.addCategoryFailure({ error }))
          )
        )
      )
    )
  );

  getCategoryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesApiActions.getCategoryById),
      switchMap((action) =>
        this.categoryService.getCategoryById(action.categoryId).pipe(
          map((category) =>
            CategoriesApiActions.getCategoryByIdSuccess({ category })
          ),
          catchError((error) =>
            of(CategoriesApiActions.getCategoryByIdFailure({ error }))
          )
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesApiActions.updateCategory),
      switchMap((action) =>
        this.categoryService.updateCategory(action.id, action.category).pipe(
          map((category) =>
            CategoriesApiActions.updateCategorySuccess({ category })
          ),
          catchError((error) =>
            of(CategoriesApiActions.updateCategoryFailure({ error }))
          )
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesApiActions.deleteCategory),
      switchMap((action) =>
        this.categoryService.deleteCategory(action.id).pipe(
          map(() =>
            CategoriesApiActions.deleteCategorySuccess({ id: action.id })
          ),
          catchError((error) =>
            of(CategoriesApiActions.deleteCategoryFailure({ error }))
          )
        )
      )
    )
  );
}
