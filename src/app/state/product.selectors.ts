import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.state';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectProductsError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectProductsTotal = createSelector(
  selectProductState,
  (state: ProductState) => state.total
);

export const selectProductsPagination = createSelector(
  selectProductState,
  (state: ProductState) => ({
    skip: state.skip,
    limit: state.limit,
    total: state.total
  })
);

export const selectCategories = createSelector(
  selectProductState,
  (state: ProductState) => state.categories
);

export const selectSelectedCategory = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedCategory
);

export const selectSearchQuery = createSelector(
  selectProductState,
  (state: ProductState) => state.searchQuery
);

export const selectIsAppending = createSelector(
  selectProductState,
  (state: ProductState) => state.isAppending
);

export const selectCanLoadMore = createSelector(
  selectProductState,
  (state: ProductState) => state.products.length < state.total
);

export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectSelectedCategory,
  selectSearchQuery,
  (products, category, query) => {
    if (query) return products;
    if (!category) return products;
    return products.filter(product => product.category === category);
  }
);
