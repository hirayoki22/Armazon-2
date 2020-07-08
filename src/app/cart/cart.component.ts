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
    this.cs.cartViewState$.subscribe(state => {
      if (state) {
        this.viewCart = true;
        document.body.classList.add('active-overlay');
      }
    });
  }

  onClose(): void {
    this.cs.changeCartViewState(false);
  }

  textClipper(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + ' . . .' : text;
  }

}
