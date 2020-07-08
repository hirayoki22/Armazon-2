import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Product } from '../product.model';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private ps: ProductService,
    private cs: CartService
  ) { }

  ngOnInit(): void {
    this.ps.getProducts().subscribe(prodcuts => this.products = prodcuts);
  }

  textClipper(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + ' . . .' : text;
  }

  onBuyNow(product: Product): void {
    console.log('Buying product ', product);
  }

  onAddToCart(product: Product, quantity = 1): void {
    product.quantity = quantity;
    this.cs.updateCart(product);
  }

}
