import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { SrchMatch } from '../models/srch-match.model';
import { ProductService } from '../services/product.service';
import { ShoppingBagService } from '../services/shopping-bag.service';

@Component({
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  products: SrchMatch[] = [];

  constructor(
    private route: ActivatedRoute,
    private ps: ProductService,
    private cs: ShoppingBagService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      map(param => param.get('keyword')),
      switchMap(keyword => this.ps.searchProduct(keyword))
    ).subscribe(products => this.products = products);
  }

  onAddToBag(productId: number, quantity = 1): void {
    const details = {
      productId: productId,
      quantity: quantity
    }
    this.cs.addToBag(details).subscribe();
  }
  
}
