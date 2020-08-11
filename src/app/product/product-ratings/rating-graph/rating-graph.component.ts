import { Component, OnChanges } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'rating-graph',
  templateUrl: './rating-graph.component.html',
  styleUrls: ['./rating-graph.component.scss']
})
export class RatingGraphComponent implements OnChanges {
  @Input() userRating: number[] = [];
  stars: any = {};
  totalStars = [5, 4, 3, 2, 1];

  get totalRatings(): number {
    return this.userRating.length;
  }

  constructor() { }

  ngOnChanges(): void {
    for (let i = this.totalStars.length; i > 0; i--) {
      this.stars[i] = this.userRating.filter(val => val == i).length;
    }
  }

}
