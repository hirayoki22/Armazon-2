import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { Product } from '../product.model';
import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    trigger('showCart', [
      state('close', style({
        visibility: 'hidden',
        transform: 'translateX(100%)'
      })),
      state('open', style({
        visibility: 'visible',
        transform: 'translateX(0)'
      })),
      transition('close <=> open', animate('0.3s ease'))
    ])
  ]
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  viewCart: Observable<boolean>;

  constructor(private cs: CartService) { }

  ngOnInit(): void {
    this.viewCart = this.cs.cartViewState$;

    this.viewCart.subscribe(state => {
      if (state) {
        document.body.classList.add('active-overlay');
      }
    });
  }

  onClose(): void {
    this.cs.changeCartViewState(false);
    document.body.classList.remove('active-overlay');
  }

  textClipper(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + ' . . .' : text;
  }

}
