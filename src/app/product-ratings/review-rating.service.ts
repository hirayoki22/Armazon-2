import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReviewRatingService {
  private URL = 'http://127.0.0.1/market-api/review-rating.php';  

  private ratingViewStateSource: Subject<boolean> = new Subject();
  ratingViewState$: Observable<boolean> = this.ratingViewStateSource.asObservable();

  constructor(private http: HttpClient) { }

  getProductRating(id: number): any { 

  }

  getProductReviews(id: number): any { 

  }

  openRatingsPanel(view: boolean): void {
    this.ratingViewStateSource.next(view);
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