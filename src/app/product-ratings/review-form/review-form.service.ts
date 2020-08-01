import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewFormService {
  private formStateSource = new Subject<boolean>();
  $formState = this.formStateSource.asObservable();

  constructor() { }

  openReviewForm(): void {
    this.formStateSource.next(true);
  }
}
