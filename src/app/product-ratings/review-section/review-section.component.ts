import { Component, OnChanges } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { Review } from '../review.model';

import { ReviewRatingService } from '../review-rating.service';

@Component({
  selector: 'review-section',
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss']
})
export class ReviewSectionComponent implements OnChanges {
  @ViewChild('reviewSection') reviewSection: ElementRef<HTMLElement>;
  @Input() productId: number;
  @Input() reviews: Review[];
  altReviews: Review[];
  reviewsPerPage: number = 3;
  currentPage: number = 0;

  get totalPages(): number {
    return Math.ceil(this.reviews.length / this.reviewsPerPage);
  }
  
  reviewLengthLimit = 800;

  constructor(private rs: ReviewRatingService) { }

  ngOnChanges(): void {
    this.initUserReviews();
  }

  initUserReviews(): void {
    const start = this.currentPage * this.reviewsPerPage;
    const end = this.currentPage * this.reviewsPerPage + this.reviewsPerPage;

    this.altReviews = this.reviews.slice(start, end);
  }

  onPageChange(direction: 'previous' | 'next'): void {
    const section = this.reviewSection.nativeElement.offsetParent;

    switch (direction) {
      case 'previous':
        if (this.currentPage == 0) { return; }        
        this.currentPage--;
        break;

      case 'next':
        if (this.currentPage == this.totalPages - 1) { return; }        
        this.currentPage++;
        break;
    
      default:
        console.log('Invalid direction: ', direction);
        break;
    }

    section.scrollTo({ top: 0, behavior: 'smooth' });
    this.initUserReviews();
  }

  getReviewBody(review: Review): string {
    if (this.isLong(review.review) && !review.expandReview) {
      return `${review.review.slice(0, this.reviewLengthLimit)}`;
    } else {
      return review.review;
    }
  }

  isLong(body: string): boolean {
    return body.length >= this.reviewLengthLimit;
  }

}
