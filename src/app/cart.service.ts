import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];

  private cartViewStateSource: Subject<boolean> = new Subject();
  cartViewState$: Observable<boolean> = this.cartViewStateSource.asObservable();

  private itemCountSource: Subject<number> = new Subject();
  itemCount$: Observable<number> = this.itemCountSource.asObservable();

  constructor() { }

  changeCartViewState(view: boolean): void {
    this.cartViewStateSource.next(view);
  }

  updateCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.productId == product.productId);
    
    if (existingItem) {
      existingItem.quantity += 1;  
    } else {
      this.cartItems.unshift(product);
      this.itemCountSource.next(this.cartItems.length);
    }
    console.log(this.cartItems);
  }

}
