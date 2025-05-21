import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../state/product.state';

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(skip = 0, limit = 10): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      `${this.apiUrl}?skip=${skip}&limit=${limit}`
    );
  }

  getProductsByCategory(category: string, skip = 0, limit = 10): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(
      `${this.apiUrl}/category/${category}?skip=${skip}&limit=${limit}`
    );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }

  searchProducts(query: string): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.apiUrl}/search?q=${query}`);
  }
}
