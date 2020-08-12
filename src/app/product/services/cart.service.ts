import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError, of } from 'rxjs';
import { delay, map, catchError, tap, switchMap } from 'rxjs/operators';

import { CartItem } from '../models/cart-item.model';
import { UserService } from 'src/app/user/services/user.service';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: '2454789645'
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private URL = 'http://127.0.0.1/market-api/shopping-cart.php';

  private cartViewStateSource: Subject<boolean> = new Subject();
  cartViewState$: Observable<boolean> = this.cartViewStateSource.asObservable();

  private cartChangeSource: Subject<boolean> = new Subject();
  cartChange$: Observable<boolean> = this.cartChangeSource.asObservable();


  constructor(
    private http: HttpClient,
    private us: UserService
  ) { }

  openShoppingCart(view: boolean): void {
    this.cartViewStateSource.next(view);
  }

  get itemCount(): Observable<number> {
    return this.http.get<{total: number}>(
      `${this.URL}?count=true`,
      httpOptions
    ).pipe(
      map(count => count?.total ? count.total : 0),
      catchError(this.errorHandler)
    );
  }

  getShoppingCart(): Observable<CartItem[] | boolean> {
    return this.us.isLoggedin.pipe(
      switchMap(state => {
        if (state) {
          return this.http.get<CartItem[]>(this.URL, httpOptions)
          .pipe(
            delay(300),
            catchError(this.errorHandler)
          )
        } else {
          return of(false);
        }
      })
    ); 
  }

  addToCart(item: {productId: number, quantity: number}) {
    return this.us.isLoggedin.pipe(
      switchMap(loggedin => {
        if (loggedin) {
          return this.http.post<any>(this.URL, item, httpOptions)
          .pipe(
            tap(() => {
              this.cartViewStateSource.next(true);
              this.cartChangeSource.next(true);
            }),
            catchError(this.errorHandler)
          );
        } else {
          return of(this.cartViewStateSource.next(true));
        }
      })
    );
  }

  updateItemQuantity(item: { 
    productId: number, 
    quantity: number 
  }): Observable<any> {
    return this.http.put<any>(this.URL, item, httpOptions).pipe(
      tap(() => {
        this.cartViewStateSource.next(true);
        this.cartChangeSource.next(true);
      }),
      catchError(this.errorHandler)
    );
  }

  removeFromCart(productId: number): Observable<any> { 
    return this.http.delete<any>(
      `${this.URL}?productId=${productId}`,
      httpOptions
    ).pipe(
      tap(() => {
        this.cartViewStateSource.next(true);
        this.cartChangeSource.next(true);
      }),
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
