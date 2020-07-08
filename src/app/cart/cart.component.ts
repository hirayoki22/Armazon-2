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
  private _cartItems: Product[];
  viewCart: boolean;

  get cartItems(): Product[] {
    const cartItems = [];
    
    this._cartItems.forEach(product => {
      if (!this.cartItems.some(cur => cur.productId == product.productId)) {
        cartItems.push(product);
      }
    });

    cartItems.map(item => {
      const matches = this._cartItems.filter(cur => cur.productId == item.productId);
      item.quantity = matches.length;
    });
    return cartItems;
  }
 

  get subtotal(): number {
    return Math.round(this._cartItems.map(item => item.price)
    .reduce((a, b) => a + b, 0) * 100) / 100;
  }

  get itemCount(): number {
    return this._cartItems.length;
  }

  constructor(private cs: CartService) { }

  ngOnInit(): void {
    this._cartItems = this.cs.cartItems;

    this.cs.cartViewState$.subscribe(state => {
      this.viewCart = state;
      document.body.classList.add('active-overlay');
    });
  }

  onClose(): void {
    const overlay = document.querySelector('.overlay');
    const section = document.querySelector('.cart-container');

    section.classList.add('slide-out');
    overlay.classList.add('hide');

    setTimeout(() => {
      this.viewCart = false;
      document.body.classList.remove('active-overlay');
      overlay.classList.remove('hide');
      section.classList.remove('slide-out');
    }, 400);
  }

  onRemove(productId: number): void {
    this.cs.removeFromCart(productId);
    this.cartItems = this.cs.cartItems;
  }

  textClipper(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + ' . . .' : text;
  }

  checkItemQuantity(): void {

  }

}
