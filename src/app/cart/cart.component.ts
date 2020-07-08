import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { Product } from '../product.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  viewCart: boolean;

  constructor(private cs: CartService) { }

  ngOnInit(): void {

    this.cs.cartViewState$.subscribe(state => {
      if (state) {
        this.viewCart = state;
        document.body.classList.add('active-overlay');
      }
    });
  }

  onClose(): void {
    const overlay = document.querySelector('.overlay');
    const section = document.querySelector('.cart-container');

    section.classList.add('slide-out');
    overlay.classList.add('hide');

    setTimeout(() => {
      this.viewCart = false;
      overlay.classList.remove('hide');
      section.classList.remove('slide-out');
    }, 400);
  }

  textClipper(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + ' . . .' : text;
  }

}
