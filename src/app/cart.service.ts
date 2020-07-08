import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { delay } from 'rxjs/operators';
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

  getCartItems(): Observable<Product[]> {
    return of(this.cartItems).pipe(delay(1000));
  }

  changeCartViewState(view: boolean): void {
    this.cartViewStateSource.next(view);
  }

  addToCart(product: Product) {
    this.cartItems.unshift(product);
    this.itemCountSource.next(this.cartItems.length);
  }

  removeFromCart(id: number): Observable<Product[]> {
    this.cartItems = this.cartItems.filter(product => product.productId !== id);
    this.itemCountSource.next(this.cartItems.length);
    return this.getCartItems();
  }
}
