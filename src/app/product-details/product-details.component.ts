import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private ps: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = +params.get('id');

      this.ps.getProductById(productId).subscribe(product => {
        this.product = product;
        this.isLoading = false;
      });
    });
  }

}
