import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError, of } from 'rxjs';
import { delay, map, catchError, tap, switchMap } from 'rxjs/operators';

import { BagItem } from '../models/shopping-bag-item.model';
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
export class ShoppingBagService {
  private URL = 'http://127.0.0.1/market-api/shopping-bag.php';

  private bagViewStateSource: Subject<boolean> = new Subject();
  bagViewState$: Observable<boolean> = this.bagViewStateSource.asObservable();

  private bagChangeSource: Subject<boolean> = new Subject();
  bagChange$: Observable<boolean> = this.bagChangeSource.asObservable();


  constructor(
    private http: HttpClient,
    private us: UserService
  ) { }

  openShoppingBag(view: boolean): void {
    this.bagViewStateSource.next(view);
  }

  get itemCount(): Observable<number> {
    return this.us.isLoggedin.pipe(
      switchMap(state => {
        if (state) {
          return this.http.get<{total: number}>(
            `${this.URL}?count=true`,
            httpOptions
          ).pipe(
            map(count => count?.total ? count.total : 0),
            catchError(this.errorHandler)
          );
        } else {
          return of(0);
        }
      })
    );
  }

  getShoppingBag(): Observable<BagItem[] | boolean> {
    return this.us.isLoggedin.pipe(
      switchMap(state => {
        if (state) {
          return this.http.get<BagItem[]>(this.URL, httpOptions)
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

  addToBag(item: {productId: number, quantity: number}) {
    return this.us.isLoggedin.pipe(
      switchMap(loggedin => {
        if (loggedin) {
          return this.http.post<any>(this.URL, item, httpOptions)
          .pipe(
            tap(() => {
              this.bagViewStateSource.next(true);
              this.bagChangeSource.next(true);
            }),
            catchError(this.errorHandler)
          );
        } else {
          return of(this.bagViewStateSource.next(true));
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
        this.bagViewStateSource.next(true);
        this.bagChangeSource.next(true);
      }),
      catchError(this.errorHandler)
    );
  }

  removeFromBag(productId: number): Observable<any> { 
    return this.http.delete<any>(
      `${this.URL}?productId=${productId}`,
      httpOptions
    ).pipe(
      tap(() => {
        this.bagViewStateSource.next(true);
        this.bagChangeSource.next(true);
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
