import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ProductsApiActions } from './products.actions'; // Updated import
import { ProductService } from 'src/app/core/services/product.service'; // Updated import

@Injectable()
export class ProductEffects {
  // Updated class name
  constructor(
    private actions$: Actions,
    private productService: ProductService // Updated service name
  ) {}

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsApiActions.getProductList), // Updated action name
      switchMap(() =>
        this.productService.getProducts().pipe(
          // Updated service name
          map(
            ({ products }) =>
              ProductsApiActions.getProductListSuccess({ products }) // Updated action name
          ),
          catchError(
            (error) => of(ProductsApiActions.getProductListFailure({ error })) // Updated action name
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsApiActions.addProduct), // Updated action name
      switchMap((action) =>
        this.productService.addProduct(action.product).pipe(
          // Updated service name and action name
          map((newProductResponse) => {
            return ProductsApiActions.addProductSuccess({
              // Updated action name
              product: newProductResponse.product, // Updated property name
            });
          }),
          catchError(
            (error) => of(ProductsApiActions.addProductFailure({ error })) // Updated action name
          )
        )
      )
    )
  );

  getProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsApiActions.getProductById), // Updated action name
      switchMap((action) =>
        this.productService.getProductById(action.productId).pipe(
          // Updated service name and action name
          map(
            (productResponse) =>
              ProductsApiActions.getProductByIdSuccess({
                product: productResponse.product,
              }) // Updated action name
          ),
          catchError(
            (error) => of(ProductsApiActions.getProductByIdFailure({ error })) // Updated action name
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsApiActions.updateProduct), // Updated action name
      switchMap((action) =>
        this.productService.updateProduct(action.id, action.product).pipe(
          // Updated service name and action name
          map(
            (productResponse) =>
              ProductsApiActions.updateProductSuccess({
                product: productResponse.product,
              }) // Updated action name
          ),
          catchError(
            (error) => of(ProductsApiActions.updateProductFailure({ error })) // Updated action name
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsApiActions.deleteProduct), // Updated action name
      switchMap((action) =>
        this.productService.deleteProduct(action.id).pipe(
          // Updated service name and action name
          map(
            () => ProductsApiActions.deleteProductSuccess({ id: action.id }) // Updated action name
          ),
          catchError(
            (error) => of(ProductsApiActions.deleteProductFailure({ error })) // Updated action name
          )
        )
      )
    )
  );
}
