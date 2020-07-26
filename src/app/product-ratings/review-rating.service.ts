import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';

import { Rating } from './rating.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewRatingService {
  private URL = 'http://127.0.0.1/market-api/product-rating.php';  
  private URL2 = 'http://127.0.0.1/market-api/product-review.php';  

  private ratingViewStateSource: Subject<number> = new Subject();
  ratingViewState$: Observable<number> = this.ratingViewStateSource.asObservable();

  constructor(private http: HttpClient) { }

  getProductRating(id: number): Observable<Rating> { 
    return this.http.get<Rating>(`${this.URL}/${id}`).pipe(
      tap(res => console.log(res)),
      catchError(this.errorHandler)
    );
  }

  getProductReviews(id: number): any { 

  }

  openRatingsPanel(id: number): void {
    this.ratingViewStateSource.next(id);
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