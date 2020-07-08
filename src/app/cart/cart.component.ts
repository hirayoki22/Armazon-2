import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  viewCart: boolean = false;

  constructor(private cs: CartService) { }

  ngOnInit(): void {
    document.body.classList.add('active-overlay');
  }

  onClose(): void {
    this.cs.changeCartViewState(false);
  }

}
