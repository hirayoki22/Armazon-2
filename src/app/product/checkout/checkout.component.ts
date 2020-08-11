import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderService } from '../services/order.service';
import { CartItem } from '../models/cart-item.model';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal: number = 0;
  isLoading: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private os: OrderService
  ) { }

  ngOnInit(): void {
    this.cartItems = history.state.data;
    console.log(this.cartItems);
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
