import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rating-graph',
  templateUrl: './rating-graph.component.html',
  styleUrls: ['./rating-graph.component.scss']
})
export class RatingGraphComponent implements OnInit {
  totalStars = [5, 4, 3, 2, 1];

  ratings: number[] = [60, 20, 10, 1, 9];

  constructor() { }

  ngOnInit(): void {
  }

}
