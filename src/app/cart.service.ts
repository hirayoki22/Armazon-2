import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { Product } from './product.model';
import { Cart } from './cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private URL = 'http://127.0.0.1/market-api/shopping-cart.php';
  private cartItems: Product[] = []; // Temporary

  private cartViewStateSource: Subject<boolean> = new Subject();
  cartViewState$: Observable<boolean> = this.cartViewStateSource.asObservable();

  private itemCountSource: Subject<number> = new Subject();
  itemCount$: Observable<number> = this.itemCountSource.asObservable();


  constructor(private http: HttpClient) { }

  getShoppingCart(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.URL}/${userId}`);
  }

  getCartItems(): Observable<Product[]> { // Temporary
    return of(this.cartItems).pipe(
      map((items: Product[]) => {
        let cartItems = [];

        items.forEach(product => {
          if (!cartItems.some(cur => cur.productId == product.productId)) {
            cartItems.push(product);
          }
        });
    
        cartItems.map(item => {
          const matches = items.filter(cur => cur.productId == item.productId);
          item.quantity = matches.length;
        });
        return cartItems;
      }),
      delay(300)
    );
  }

  changeCartViewState(view: boolean): void {
    this.cartViewStateSource.next(view);
  }

  addToCart(product: Product) { // Temporary
    this.cartItems.unshift(product);
    this.itemCountSource.next(this.cartItems.length);
    this.cartViewStateSource.next(true);
  }

  removeFromCart(id: number): Observable<Product[]> { // Temporary
    this.cartItems = this.cartItems.filter(product => product.productId !== id);
    this.itemCountSource.next(this.cartItems.length);
    return this.getCartItems();
  }

  private errorHandler(err: HttpErrorResponse) {
    let error = '';

    if (err.error instanceof ErrorEvent) {
      error = err.error.message;
    } else {
      error = err.error;
    }
    return throwError(error);
  }
  
}
