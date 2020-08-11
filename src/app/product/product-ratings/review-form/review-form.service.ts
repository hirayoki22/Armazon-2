import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewFormService {
  private formStateSource = new Subject<number>();
  $formState = this.formStateSource.asObservable();

  constructor() { }

  openReviewForm(productId: number): void {
    this.formStateSource.next(productId);
  }
}
