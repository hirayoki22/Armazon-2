import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { ReviewRatingService } from './review-rating.service';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  providers: [ ReviewRatingService ]
})
export class StarRating implements OnInit {
  @Input() rating: number;
  @Input() reviewCount: number = 11178;
  @Output() changeNotify: EventEmitter<number> = new EventEmitter();
  totalStars: any[] = Array(5);
  showRating: boolean = true;
  

  constructor(private rs: ReviewRatingService) { }

  ngOnInit(): void {
  }

  onClick(rating: number): void {
    this.changeNotify.emit(rating);
  }

}