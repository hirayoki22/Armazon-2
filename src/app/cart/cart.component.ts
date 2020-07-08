import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { Product } from '../product.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private _cartItems: Product[];
  cartItems: Product[] = [];
  viewCart: boolean;
  isLoading: boolean = true;

  get subtotal(): number {
    return Math.round(this._cartItems.map(item => item.price)
    .reduce((a, b) => a + b, 0) * 100) / 100;
  }

  get itemCount(): number {
    return this._cartItems.length;
  }


  constructor(private cs: CartService) { }

  ngOnInit(): void {
    this.cs.cartViewState$.subscribe(state => {
      this.viewCart = state;
      document.body.classList.add('active-overlay');

      window.onkeyup = (e: KeyboardEvent) => {
        if (e.key == 'Escape') { this.onClose(); }
      }

      this.cs.getCartItems().subscribe(items => {
        this.initCart(items);
        this.isLoading = false;
      });
    });
  }

  initCart(items: Product[]): void {
    this._cartItems = items;

    this._cartItems.forEach(product => {
      if (!this.cartItems.some(cur => cur.productId == product.productId)) {
        this.cartItems.push(product);
      }
    });

    this.cartItems.map(item => {
      const matches = this._cartItems.filter(cur => cur.productId == item.productId);
      item.quantity = matches.length;
    });
  }

  onClose(): void {
    const overlay = document.querySelector('.overlay');
    const section = document.querySelector('.cart');

    section.classList.add('slide-out');
    overlay.classList.add('hide');
    window.onkeyup = null;

    setTimeout(() => {
      this.viewCart = false;
      this.isLoading = true;
      document.body.classList.remove('active-overlay');
      overlay.classList.remove('hide');
      section.classList.remove('slide-out');
    }, 400);
  }

  onRemove(productId: number): void {
    this.cs.removeFromCart(productId);
    this.cartItems = [];
  }

  overlayClick(e: MouseEvent): void {
    if (e.target == e.currentTarget) { this.onClose(); }
  }

}
