import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ShoppingBagService } from '../services/shopping-bag.service';
import { BagItem } from '../models/shopping-bag-item.model';
import { Product } from '../models/product.model';

@Component({
  selector: 'shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss']
})
export class ShoppingBag implements OnInit {
  @ViewChild('itemList') itemList: ElementRef<HTMLElement>;
  bagItems: BagItem[] = [];
  showShoppingBag: boolean = false;
  isLoading: boolean = false;
  isLoggedin: boolean = true;

  get subtotal(): number {
    return Math.round(this.bagItems.map(item => item.subtotal)
    .reduce((a, b) => a + b, 0) * 100) / 100;
  }

  get itemCount(): number {
    return this.bagItems.map(item => item.quantity)
    .reduce((a, b) => a + b, 0);
  }

  constructor(
    private router: Router,
    private cs: ShoppingBagService
  ) { }

  ngOnInit(): void {
    this.cs.bagViewState$.subscribe(view => {
      this.showShoppingBag = view;
      this.isLoading = true;
      
      this.cs.getShoppingBag().subscribe(res => {
        if (typeof res === 'boolean') {
          this.isLoggedin = false;
        } else {
          this.bagItems = res;
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
          this.itemList.nativeElement.scrollTo({ top: 0 });
        });        
        break;
    
      default:
        return;
    }
  }

  onRemove(productId: number): void {
    this.cs.removeFromBag(productId).subscribe();
  }

  proceedToCheckOut(): void {
    this.showShoppingBag = false;
    this.router.navigate(
      ['./checkout'], 
      { state: { data: this.bagItems } }
    );
  }

  onClose(): void {
    this.showShoppingBag = false;
    this.bagItems = [];
  }
}
