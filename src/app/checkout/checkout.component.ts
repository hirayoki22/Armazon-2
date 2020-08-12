import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CartItem } from '../product/models/cart-item.model';
import { OrderService } from '../product/services/order.service';
import { Order } from '../product/models/order.model';

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
