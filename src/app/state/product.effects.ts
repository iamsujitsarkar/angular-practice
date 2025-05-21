import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductService } from '../services/product.service';
import * as ProductActions from './product.actions';
import { selectProductState } from './product.selectors';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(({ skip, limit, category, searchQuery }) => {
        let apiCall;

        if (searchQuery) {
          apiCall = this.productService.searchProducts(searchQuery)
            .pipe(
              map(results => ({
                products: results.products,
                total: results.total,
                skip: skip ?? 0,
                limit: limit ?? results.limit
              }))
            );
        } else if (category) {
          apiCall = this.productService.getProductsByCategory(category, skip, limit);
        } else {
          apiCall = this.productService.getProducts(skip, limit);
        }

        return apiCall.pipe(
          map((response) =>
            ProductActions.loadProductsSuccess({
              products: response.products,
              total: response.total,
              skip: response.skip,
              limit: response.limit
            })
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error: error.message }))
          )
        );
      })
    )
  );

  appendProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.appendProducts),
      withLatestFrom(this.store.select(selectProductState)),
      mergeMap(([{ skip, limit }, state]) => {
        const params = {
          skip,
          limit,
          category: state.selectedCategory,
          searchQuery: state.searchQuery,
          append: true
        };
        return of(ProductActions.loadProducts(params));
      })
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadCategories),
      mergeMap(() =>
        this.productService.getCategories().pipe(
          map((categories) =>
            ProductActions.loadCategoriesSuccess({ categories })
          ),
          catchError((error) =>
            of(ProductActions.loadCategoriesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.searchProducts),
      mergeMap(({ query }) =>
        of(ProductActions.loadProducts({ searchQuery: query }))
    )
  );
}
