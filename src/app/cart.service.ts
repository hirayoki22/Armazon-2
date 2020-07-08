import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];

  private itemCountSource: Subject<number> = new Subject();
  itemCountSource$: Observable<number> = this.itemCountSource.asObservable();

  constructor() { }

  updateCart(product: Product): void {
    this.cartItems.unshift(product);
    this.itemCountSource.next(this.cartItems.length);
  }

}
