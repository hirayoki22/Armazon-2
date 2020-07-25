import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { ReviewRatingService } from './review-rating.service';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  providers: [ ReviewRatingService ]
})
export class StarRating implements OnInit, OnChanges {
  @Input() rating: number;
  @Input() reviewCount: number = 11178;
  @Output() changeNotify: EventEmitter<number> = new EventEmitter();
  totalStars: any[] = Array(5);
  starWidth: number;
  showRating: boolean = false;
  

  constructor(private rs: ReviewRatingService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    this.starWidth = this.convertRating(this.rating);
  }

  convertRating(value: number): number {
    return Math.round(((value / this.totalStars.length) * 100) / 10) * 10;
  }

  onClick(rating: number): void {
    this.changeNotify.emit(rating);
  }
}