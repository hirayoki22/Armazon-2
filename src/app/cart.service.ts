import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { delay, map, catchError, tap } from 'rxjs/operators';

import { CartItem } from './cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private URL = 'http://127.0.0.1/market-api/shopping-cart.php';

  private cartViewStateSource: Subject<boolean> = new Subject();
  cartViewState$: Observable<boolean> = this.cartViewStateSource.asObservable();

  private cartChangeSource: Subject<boolean> = new Subject();
  cartChange$: Observable<boolean> = this.cartChangeSource.asObservable();


  constructor(private http: HttpClient) { }

  changeCartViewState(view: boolean): void {
    this.cartViewStateSource.next(view);
  }

  getItemCount(userId: number): Observable<number> {
    return this.http.get<{total: number}>(`${this.URL}?id=${userId}&count=true`)
    .pipe(
      map(count => count.total),
      catchError(this.errorHandler)
    );
  }

  getShoppingCart(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.URL}?id=${userId}`)
    .pipe(
      delay(300),
      catchError(this.errorHandler)
    );
  }

  addToCart(item: { 
    userId: number, 
    productId: number, 
    quantity: number }
  ): Observable<any> {
    return this.http.post<any>(this.URL, item).pipe(
      tap(() => {
        this.cartViewStateSource.next(true);
        this.cartChangeSource.next(true);
      }),
      catchError(this.errorHandler)
    );
  }

  // removeFromCart(id: number): Observable<Product[]> { // Temporary
  //   this.cartItems = this.cartItems.filter(product => product.productId !== id);
  //   this.itemCountSource.next(this.cartItems.length);
  //   return this.getCartItems();
  // }

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
