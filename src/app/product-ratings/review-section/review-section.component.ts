import { Component, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Review } from '../review.model';

@Component({
  selector: 'review-section',
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss']
})
export class ReviewSectionComponent implements OnInit {
  @Input() reviews: Review[];

  constructor() { }

  ngOnInit(): void {
  }

}
