import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { ReviewRatingService } from 'src/app/product-ratings/review-rating.service';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  providers: [ ReviewRatingService ]
})
export class StarRating implements OnInit {
  @Input('rating') productRating: number;
  ratingCount: number = 27;
  totalStars: any[] = Array(5);

  
  constructor(private rs: ReviewRatingService) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.rs.openRatingsPanel(true);
  }

}