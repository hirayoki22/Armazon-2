import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'rating-graph',
  templateUrl: './rating-graph.component.html',
  styleUrls: ['./rating-graph.component.scss']
})
export class RatingGraphComponent implements OnInit {
  totalStars = [5, 4, 3, 2, 1];
  rating: number[] = [ 27, 12, 2, 0, 5 ];

  get totalRatings(): number {
    return this.rating.reduce((a, b) => a + b, 0);
  }

  constructor() { }

  ngOnInit(): void {
    
  }

}
