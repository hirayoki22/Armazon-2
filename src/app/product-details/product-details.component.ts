import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductVariant } from '../product-variant.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  product: Product;
  originalProduct: number = 0;
  variants: ProductVariant[] = [];
  quantity: number = 1;
  isLoading: boolean = true;
  reloading: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private ps: ProductService,
    private cs: CartService
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
  }

  ngAfterViewInit(): void {
    this.route.paramMap.subscribe(params => {
      this.originalProduct = +params.get('id');

      this.ps.getProductById(this.originalProduct).subscribe(product => {
        this.product = product;        

        if (this.product.hasVariant) {
          this.ps.getProductVariant(this.product.productId)
          .subscribe(variants => this.variants = variants);
        }
        this.isLoading = false;        
      });
    });
  }

  updateProductInfo(productId: number): void {    
    this.reloading = true;

    this.ps.getProductById(productId).subscribe(product => {
      this.product = product;
      this.reloading = false;
    });
  }

  onBuyNow(productId: number): void {
    console.log('Buying product ', productId);
  }

  onAddToCart(productId: number): void {
    const details = {
      userId: 1,
      productId: productId,
      quantity: this.quantity
    }
    this.cs.addToCart(details).subscribe();
  }

}
