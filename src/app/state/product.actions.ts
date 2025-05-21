import { createAction, props } from '@ngrx/store';
import { Product } from './product.state';

// Load Products
export const loadProducts = createAction(
  '[Product] Load Products',
  props<{
    skip?: number;
    limit?: number;
    category?: string | null;
    append?: boolean;
    searchQuery?: string | null;
  }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[]; total: number; skip: number; limit: number }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

// Append Products
export const appendProducts = createAction(
  '[Product] Append Products',
  props<{ skip: number; limit: number }>()
);

// Load Categories
export const loadCategories = createAction('[Product] Load Categories');

export const loadCategoriesSuccess = createAction(
  '[Product] Load Categories Success',
  props<{ categories: string[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Product] Load Categories Failure',
  props<{ error: string }>()
);

// Select Category
export const selectCategory = createAction(
  '[Product] Select Category',
  props<{ category: string | null }>()
);

// Search Products
export const searchProducts = createAction(
  '[Product] Search Products',
  props<{ query: string }>()
);

export const clearSearch = createAction('[Product] Clear Search');
