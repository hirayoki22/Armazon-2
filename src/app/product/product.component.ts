import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { CartService } from '../cart/cart.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private ps: ProductService,
    private cs: CartService
  ) { }

  ngOnInit(): void {
    this.ps.getProducts().subscribe(prodcuts => this.products = prodcuts);
  }

  onBuyNow(productId: number): void {
    console.log('Buying product ', productId);
  }

  onAddToCart(productId: number, quantity = 1): void {
    const details = {
      userId: 1,
      productId: productId,
      quantity: quantity
    }
    this.cs.addToCart(details).subscribe();
  }
}
