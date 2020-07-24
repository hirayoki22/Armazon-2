import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRating implements OnInit, OnChanges {
  @Input() rating: number;
  @Output() changeNotify: EventEmitter<number> = new EventEmitter();
  starWidth: number;
  starTotal: number = 5;
  

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.starWidth = this.convertRating(this.rating);
  }

  convertRating(value: number): number {
    return Math.round(((value / this.starTotal) * 100) / 10) * 10;
  }

  onClick(rating: number): void {
    this.changeNotify.emit(rating);
  }
}