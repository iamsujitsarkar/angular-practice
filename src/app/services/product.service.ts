import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../models/product.mode';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly PRODUCTS_URL: string = 'https://fakestoreapi.com/products';

  private readonly http = inject(HttpClient)

  getProducts(): Observable<Product[] | []> {
    return this.http.get<Product[] | []>(this.PRODUCTS_URL).pipe(catchError((err) => of([])));
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.http.get<Product | undefined>(`${this.PRODUCTS_URL}/${id}`).pipe(catchError((err) => of(undefined)));
  }
}
