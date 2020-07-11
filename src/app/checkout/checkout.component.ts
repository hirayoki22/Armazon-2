import { Component, OnInit } from '@angular/core';

import { OrderService } from '../order.service';
import { CartItem } from '../cart-item.model';
import { Order } from '../order.model';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  isLoading: boolean = false;

  constructor(private os: OrderService) { }

  ngOnInit(): void {

  }

  completeCheckout(): void {
    const order: Order = {
      userId: 1,
      items: this.cartItems,
      total: this.subtotal
    };
    
    this.os.createOrder(order).subscribe();
  }
}
