import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private URL = 'http://127.0.0.1/market-api/orders.php';

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<any> {
    return this.http.post<any>(this.URL, order).pipe(
      tap(res => console.log(res)),
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
