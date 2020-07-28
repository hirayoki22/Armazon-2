import { Component, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination-cntrls',
  templateUrl: './pagination-cntrls.component.html',
  styleUrls: ['./pagination-cntrls.component.scss']
})
export class PaginationCntrlsComponent implements OnChanges {
  @Input() totalReviews: number;
  @Input() itemPerPage: number;
  @Output('currentPage') notifyChange = new EventEmitter<number>();
  currentPage: number = 0;

  get totalPages(): number {
    return Math.ceil(this.totalReviews / this.itemPerPage);
  }

  get pageIndicator(): string {
    return `${this.currentPage * this.itemPerPage + 1} - ${this.itemPerPage * this.currentPage + 1} of ${this.totalPages}`;
  }
  
  constructor() { }

  ngOnChanges(): void {
  }

  onPageChange(direction: 'previous' | 'next'): void {
    switch (direction) {
      case 'previous':
        if (this.currentPage == 0) { return; }        
        this.currentPage--;
        break;

      case 'next':
        if (this.currentPage == this.totalPages - 1) { return; }        
        this.currentPage++;
        break;
    
      default:
        console.log('Invalid direction: ', direction);
        break;
    }
    this.notifyChange.emit(this.currentPage);
  }

}
