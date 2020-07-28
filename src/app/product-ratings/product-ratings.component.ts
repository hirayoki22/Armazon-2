import { Component, OnInit } from '@angular/core';
import { ReviewRatingService } from './review-rating.service';
import { Rating } from './rating.model';
import { Review } from './review.model';

@Component({
  selector: 'app-product-ratings',
  templateUrl: './product-ratings.component.html',
  styleUrls: ['./product-ratings.component.scss']
})
export class ProductRatingsComponent implements OnInit {
  private productId: number = 0;
  rating: Rating = { overall: 0, totalReviews: 0 };
  userRating: number[] = [];
  reviews: Review[] = [];
  viewRatings: boolean = false;
  rowcount: number = 3;
  isLoading = true;
  reloading = false;

  constructor(private rs: ReviewRatingService) { }

  ngOnInit(): void {
    this.rs.ratingViewState$.subscribe(productId => {
      this.productId = productId;
      this.viewRatings = true;
      this.isLoading = true;

      this.rs.getProductRating(this.productId).subscribe(rating => {
        this.rating = rating;     
      });

      this.rs.getAllProductReviews(productId).subscribe(reviews => {
        this.userRating = reviews.map(review => review.userRating);
        
        this.rs.getOffsetProductReviews(this.productId, 0, this.rowcount)
        .subscribe(reviews => {
          this.reviews = reviews;
          this.isLoading = false;
        });
      });
      
    });
  }

  onReviewsPageChange(currentPage: number = 0): void {
    const offset = currentPage * this.rowcount;

    this.reloading = true;
    this.rs.getOffsetProductReviews(this.productId, offset, this.rowcount)
    .subscribe(reviews => {
      this.reviews = reviews;
      this.reloading = false;
    });
  }
}
