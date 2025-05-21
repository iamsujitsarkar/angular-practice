import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, fromEvent, Subject } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import {
  selectAllProducts,
  selectProductsLoading,
  selectProductsError,
  selectCategories,
  selectSelectedCategory,
  selectProductsPagination,
  selectSearchQuery,
  selectIsAppending,
  selectCanLoadMore
} from '../../state/product.selectors';
import {
  loadProducts,
  loadCategories,
  selectCategory,
  searchProducts,
  appendProducts,
  clearSearch
} from '../../state/product.actions';
import { Product } from '../../state/product.state';
import { AsyncPipe, CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [NgIf, NgFor, AsyncPipe, CurrencyPipe, CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  @ViewChild('productGrid') productGrid!: ElementRef;

  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  categories$: Observable<string[]>;
  selectedCategory$: Observable<string | null>;
  pagination$: Observable<{ skip: number; limit: number; total: number }>;
  searchQuery$: Observable<string | null>;
  isAppending$: Observable<boolean>;
  canLoadMore$: Observable<boolean>;

  searchQuery = '';
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectProductsLoading);
    this.error$ = this.store.select(selectProductsError);
    this.categories$ = this.store.select(selectCategories);
    this.selectedCategory$ = this.store.select(selectSelectedCategory);
    this.pagination$ = this.store.select(selectProductsPagination);
    this.searchQuery$ = this.store.select(selectSearchQuery);
    this.isAppending$ = this.store.select(selectIsAppending);
    this.canLoadMore$ = this.store.select(selectCanLoadMore);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
    this.store.dispatch(loadCategories());

    this.searchQuery$.pipe(takeUntil(this.destroy$))
      .subscribe(query => {
        this.searchQuery = query || '';
      });
  }

  ngAfterViewInit(): void {
    fromEvent(this.productGrid.nativeElement, 'scroll')
      .pipe(
        debounceTime(200),
        filter(() => {
          const element = this.productGrid.nativeElement;
          return element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
        }),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadMoreProducts();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCategorySelect(category: string | null): void {
    this.store.dispatch(selectCategory({ category }));
    this.store.dispatch(loadProducts({ category }));
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.store.dispatch(searchProducts({ query: this.searchQuery }));
    } else {
      this.onClearSearch();
    }
  }

  onClearSearch(): void {
    this.store.dispatch(clearSearch());
    this.store.dispatch(loadProducts());
  }

  loadMoreProducts(): void {
    this.pagination$.pipe(takeUntil(this.destroy$)).subscribe(pagination => {
      if (pagination.skip + pagination.limit < pagination.total) {
        this.store.dispatch(appendProducts({
          skip: pagination.skip + pagination.limit,
          limit: pagination.limit
        }));
      }
    });
  }
}
