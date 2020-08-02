import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { ReviewRatingService } from 'src/app/product-ratings/review-rating.service';
import { Rating } from 'src/app/product-ratings/rating.model';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRating implements OnInit, OnChanges {
  @Input() productId: number;
  @Input() overall: number;
  @Input() totalReviews: number;
  @Input() readonly: boolean = false;
  @Input() newRating: boolean = false;
  @Output('selectedRating') notifyRating = new EventEmitter<number>();
  rating: Rating = { overall: 0, totalReviews: 0 };
  totalStars: any[] = Array(5);

  
  constructor(private rs: ReviewRatingService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (!this.readonly && !this.newRating) {
      this.rs.getProductRating(this.productId).subscribe(rating => {
        this.rating = rating;
      });
    } else {
      this.rating.overall = this.overall || 0;
      this.rating.totalReviews = this.totalReviews || 0;
    }
  }

  onClick(): void {
    if (this.readonly || this.newRating) { return; }
    this.rs.openRatingsPanel(this.productId);
  }

  onClick2(rating: number): void {
    this.rating.overall = rating;
    this.notifyRating.emit(rating);
  }
}