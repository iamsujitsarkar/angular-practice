import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Product } from '../models/product.mode';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly PRODUCTS_URL: string = 'https://fakestoreapi.com/products';

  private readonly http = inject(HttpClient)

  constructor(@Inject('API_URL') private apiUrl: string) {}

  getProducts(): Observable<Product[] | []> {
    return this.http.get<Product[] | []>(this.PRODUCTS_URL).pipe(catchError((err) => of([])));

    // return this.http.get<Product[]>(`${this.apiUrl}/products`)
    //   .pipe(
    //     map(res => res),
    //     catchError(err => {
    //       console.error('Failed to fetch products', err);
    //       return throwError(() => err);
    //     })
    //   );
  }

  getProduct(id: number): Observable<Product | undefined> {
    return this.http.get<Product | undefined>(`${this.PRODUCTS_URL}/${id}`).pipe(catchError((err) => of(undefined)));
  }
}
