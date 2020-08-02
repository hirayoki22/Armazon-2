import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError, tap, delay } from 'rxjs/operators';

import { Rating } from './rating.model';
import { Review } from './review.model';
import { NewReview } from './new-review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewRatingService {
  private URL  = 'http://127.0.0.1/market-api/product-rating.php';  
  private URL2 = 'http://127.0.0.1/market-api/product-reviews.php';  

  private ratingViewStateSource: Subject<number> = new Subject();
  ratingViewState$: Observable<number> = this.ratingViewStateSource.asObservable();

  constructor(private http: HttpClient) { }

  openRatingsPanel(id: number): void {
    this.ratingViewStateSource.next(id);
  }

  getProductRating(id: number): Observable<Rating> { 
    return this.http.get<Rating>(`${this.URL}/${id}`).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllProductReviews(id: number): Observable<Review[]> { 
    return this.http.get<Review[]>(`${this.URL2}?id=${id}`).pipe(
      map(reviews => {
        reviews.map(review => review.reviewDate = new Date(review.reviewDate));
        return reviews;
      }),
      catchError(this.errorHandler)
    );    
  }

  getOffsetProductReviews(
    id: number, 
    offset: number, 
    rowcount: number
  ): Observable<Review[]> { 
    return this.http.get<Review[]>(`${this.URL2}?id=${id}&offset=${offset}&count=${rowcount}`)
    .pipe(
      delay(400),
      map(reviews => {
        reviews.map(review => review.reviewDate = new Date(review.reviewDate));
        return reviews;
      }),
      catchError(this.errorHandler)
    );    
  }

  submitNewReview(review: NewReview): Observable<any> {
    return this.http.post<NewReview>(this.URL2, review).pipe(
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