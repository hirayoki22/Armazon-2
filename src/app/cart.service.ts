import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];

  private cartItemsSource: Subject<Product[]> = new Subject();
  cartItems$: Observable<Product[]> = this.cartItemsSource.asObservable();

  private cartViewStateSource: Subject<boolean> = new Subject();
  cartViewState$: Observable<boolean> = this.cartViewStateSource.asObservable();

  private itemCountSource: Subject<number> = new Subject();
  itemCount$: Observable<number> = this.itemCountSource.asObservable();

  constructor() { }

  changeCartViewState(view: boolean): void {
    this.cartViewStateSource.next(view);
  }

  addToCart(product: Product): void {
    this.cartItems.unshift(product);
    this.cartItemsSource.next(this.cartItems);
    this.itemCountSource.next(this.cartItems.length);
  }

  removeFromCart(id: number): void {
    this.cartItems = this.cartItems.filter(product => product.productId !== id);
    this.cartItemsSource.next(this.cartItems);
    this.itemCountSource.next(this.cartItems.length);
  }
}
