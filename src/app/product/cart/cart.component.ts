import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('itemList') itemList: ElementRef<HTMLElement>;
  cartItems: CartItem[] = [];
  viewCart: boolean = false;
  isLoading: boolean = false;
  isLoggedin: boolean = true;

  get subtotal(): number {
    return Math.round(this.cartItems.map(item => item.subtotal)
    .reduce((a, b) => a + b, 0) * 100) / 100;
  }

  get itemCount(): number {
    return this.cartItems.map(item => item.quantity)
    .reduce((a, b) => a + b, 0);
  }

  constructor(
    private router: Router,
    private cs: CartService
  ) { }

  ngOnInit(): void {
    this.cs.cartViewState$.subscribe(view => {
      this.viewCart = view;
      this.isLoading = true;
      
      this.cs.getShoppingCart().subscribe(res => {
        if (typeof res === 'boolean') {
          this.isLoggedin = false;
        } else {
          this.cartItems = res;
          this.isLoggedin = true;
        }
        this.isLoading = false;
      });
    });
  }

  quantityChanges(product: Product, value: any): void {
    if (!value) { return; }

    const quantity = +value;

    switch (true) {
      case quantity === 0:
        this.onRemove(product.productId);
        break;

      case quantity <= product.totalStock:
        const item = {
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
    this.cs.removeFromCart(productId).subscribe();
  }

  proceedToCheckOut(): void {
    this.viewCart = false;
    this.router.navigate(
      ['./checkout'], 
      { state: { data: this.cartItems } }
    );
  }

  onClose(): void {
    this.viewCart = false;
    this.cartItems = [];
  }
}
