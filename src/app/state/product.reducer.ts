import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { ProductState, initialState } from './product.state';

export const productReducer = createReducer(
  initialState,

  // Load Products
  on(ProductActions.loadProducts, (state, { skip, limit, category, append, searchQuery }) => ({
    ...state,
    loading: true,
    error: null,
    skip: skip ?? state.skip,
    limit: limit ?? state.limit,
    selectedCategory: category ?? state.selectedCategory,
    searchQuery: searchQuery ?? state.searchQuery,
    isAppending: append ?? false,
    products: (append || (searchQuery && searchQuery === state.searchQuery)) ? state.products : []
  })),

  on(ProductActions.loadProductsSuccess, (state, { products, total, skip, limit }) => ({
    ...state,
    products: state.isAppending ? [...state.products, ...products] : products,
    total,
    skip,
    limit,
    loading: false,
    isAppending: false
  })),

  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    isAppending: false
  })),

  // Append Products
  on(ProductActions.appendProducts, (state, { skip, limit }) => ({
    ...state,
    skip,
    limit,
    loading: true,
    isAppending: true
  })),

  // Load Categories
  on(ProductActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ProductActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false
  })),

  on(ProductActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(ProductActions.selectCategory, (state, { category }) => ({
    ...state,
    category: category
  })),
)
