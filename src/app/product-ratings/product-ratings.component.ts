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
  rating: Rating = { overall: 0, totalReviews: 0 };
  userRating: number[] = [];
  reviews: Review[] = [];
  viewRatings: boolean = true;
  altReviews: Review[];
  reviewsPerPage: number = 6;
  currentPage: number = 0;
  isLoading = false;

  get totalPages(): number {
    return Math.ceil(this.reviews.length / this.reviewsPerPage);
  }
  
  constructor(private rs: ReviewRatingService) { }

  ngOnInit(): void {
    this.rs.ratingViewState$.subscribe(productId => {
      this.viewRatings = true;
      this.isLoading = true;

      this.rs.getProductRating(productId).subscribe(rating => {
        this.rating = rating;        
      });

      this.rs.getProductReviews(productId).subscribe(reviews => {
        this.reviews = reviews;
        this.userRating = this.reviews.map(review => review.userRating);
        this.isLoading = false;
      });
    });
  }

  initUserReviews(): void {
    const start = this.currentPage * this.reviewsPerPage;
    const end = this.currentPage * this.reviewsPerPage + this.reviewsPerPage;

    this.altReviews = this.reviews.slice(start, end);
  }

  onPageChange(page: number): void {
    if (page !== this.currentPage && page < this.totalPages) {

    }
  }

}
