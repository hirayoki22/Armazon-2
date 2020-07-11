import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { CartItem } from '../cart-item.model';
import { Order } from '../order.model';
import { Product } from '../product.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('itemList') itemList: ElementRef<HTMLElement>;
  cartItems: CartItem[] = [];
  viewCart: boolean;
  isLoading: boolean = true;

  get subtotal(): number {
    return Math.round(this.cartItems.map(item => item.subtotal)
    .reduce((a, b) => a + b, 0) * 100) / 100;
  }

  get itemCount(): number {
    return this.cartItems.map(item => item.quantity).reduce((a, b) => a + b, 0);
  }

  constructor(private cs: CartService) { }

  ngOnInit(): void {
    this.cs.cartViewState$.subscribe(state => {
      this.viewCart = state;

      document.body.classList.add('active-overlay');
      window.onkeyup = (e: KeyboardEvent) => {
        if (e.key == 'Escape') { this.onClose(); }
      }

      this.cs.getShoppingCart(1).subscribe(items => {
        this.cartItems = items;
        this.isLoading = false;
      });
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

  quantityChanges(product: Product, quantity: number): void {
    this.isLoading = true;

    switch (true) {
      case quantity == 0:
        this.onRemove(product.productId);
        break;

      case quantity <= product.totalStock:
        const item = {
          userId: 1,
          productId: product.productId,
          quantity: quantity
        };
    
        this.cs.updateItemQuantity(item).subscribe(() => {
          this.itemList.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
        });        
        break;
    
      default:
        return;
    }
  }

  onRemove(productId: number): void {
    this.isLoading = true;
    this.cs.removeFromCart(1, productId).subscribe();
  }

  overlayClick(e: MouseEvent): void {
    if (e.target == e.currentTarget) { this.onClose(); }
  }

}
