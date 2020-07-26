import { Component, OnInit } from '@angular/core';
import { ReviewRatingService } from './review-rating.service';
import { Rating } from './rating.model';

@Component({
  selector: 'app-product-ratings',
  templateUrl: './product-ratings.component.html',
  styleUrls: ['./product-ratings.component.scss']
})
export class ProductRatingsComponent implements OnInit {
  rating: Rating;
  viewRatings: boolean = false;
  isLoading = false;

  constructor(private rs: ReviewRatingService) { }

  ngOnInit(): void {
    this.rs.ratingViewState$.subscribe(productId => {
      this.viewRatings = true;

      console.log(productId);
    });
  }

}
