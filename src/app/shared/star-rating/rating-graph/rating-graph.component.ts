import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rating-graph',
  templateUrl: './rating-graph.component.html',
  styleUrls: ['./rating-graph.component.scss']
})
export class RatingGraphComponent implements OnInit {
  totalStars = [5, 4, 3, 2, 1];

  rating: number[] = [ 17, 0, 0, 1, 1 ];

  get totalRatings(): number {
    return this.rating.reduce((a, b) => a + b, 0);
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.rating['4'])
  }

  getnearestTen(value: number): number {
    return Math.round(((value / this.totalStars.length) * 100) / 10) * 10;
  }

}
