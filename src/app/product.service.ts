import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, delay } from 'rxjs/operators';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private URL  = 'http://127.0.0.1/market-api/products.php';
  private URL2 = 'http://127.0.0.1/market-api/product-category.php';

  constructor(private http: HttpClient) { }

  addProducts(form: FormData): Observable<any> {
    return this.http.post<any>(this.URL, form).pipe(
      delay(500),
      tap(res => console.log(res)),
      catchError(this.errorHandler)
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL).pipe(
      catchError(this.errorHandler)
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.URL}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.URL2).pipe(
      catchError(this.errorHandler)
    );
  }

  private errorHandler(err: HttpErrorResponse) {
    let error = '';

    if (err.error instanceof ErrorEvent) {
      error = err.error.message;
    } else {
      error = err.error;
    }
    return throwError(error);
  }
  
} 