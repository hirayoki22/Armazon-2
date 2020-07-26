import { Component, OnInit } from '@angular/core';
import { ReviewRatingService } from './review-rating.service';

@Component({
  selector: 'app-product-ratings',
  templateUrl: './product-ratings.component.html',
  styleUrls: ['./product-ratings.component.scss']
})
export class ProductRatingsComponent implements OnInit {
  productRating: number = 4.3;
  viewRatings: boolean = false;
  isLoading = false;

  constructor(private rs: ReviewRatingService) { }

  ngOnInit(): void {
    this.rs.ratingViewState$.subscribe(state => {
      this.viewRatings = state
    });
  }

}
