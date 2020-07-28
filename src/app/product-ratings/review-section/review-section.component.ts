import { Component, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { Review } from '../review.model';

@Component({
  selector: 'review-section',
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss']
})
export class ReviewSectionComponent implements OnChanges {
  @Input() reviews: Review[];
  reviewLengthLimit = 800;

  constructor() { }

  ngOnChanges(): void {
  }

  getReviewBody(body: string): string {
    return this.isLong(body) ? `${body.slice(0, this.reviewLengthLimit)}` : body;
  }

  isLong(body: string): boolean {
    return body.length >= this.reviewLengthLimit;
  }

}
