import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BagItem } from '../product/models/shopping-bag-item.model';
import { OrderService } from '../product/services/order.service';
import { Order } from '../product/models/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  bagItems: BagItem[] = [];
  subtotal: number = 0;
  isLoading: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private os: OrderService
  ) { }

  ngOnInit(): void {
    this.bagItems = history.state.data;
    console.log(this.bagItems);
  }

  completeCheckout(): void {
    const order: Order = {
      userId: 1,
      items: this.bagItems,
      total: this.subtotal
    };
    
    this.os.createOrder(order).subscribe();
  }
}
