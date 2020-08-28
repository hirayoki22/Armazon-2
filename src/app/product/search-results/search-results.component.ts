import { Component, OnInit } from '@angular/core';

import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { ShoppingBagService } from '../services/shopping-bag.service';

@Component({
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private ps: ProductService,
    private cs: ShoppingBagService
  ) { }

  ngOnInit(): void {
    this.ps.getProducts().subscribe(prodcuts => {
      this.products = prodcuts
    });
  }

  onAddToBag(productId: number, quantity = 1): void {
    const details = {
      productId: productId,
      quantity: quantity
    }
    this.cs.addToBag(details).subscribe();
  }
  
}
