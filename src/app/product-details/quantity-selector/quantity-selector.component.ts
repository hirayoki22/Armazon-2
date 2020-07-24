import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.scss']
})
export class QuantitySelectorComponent implements OnInit {
  @Input() limit: number;
  @Output('quantity') notifyChange: EventEmitter<number> = new EventEmitter();
  quantity: number = 1;  

  constructor() { }

  ngOnInit(): void {
  }

  selectQuantity(action: 'minus' | 'plus'): void {
    if (action === 'minus') {
      this.quantity = this.quantity > 1 ? 
      this.quantity -= 1 : this.quantity;
    } else {
      this.quantity = this.quantity < this.limit ?
      this.quantity += 1 : this.quantity;
    }

    this.notifyChange.emit(this.quantity);
  }

}
