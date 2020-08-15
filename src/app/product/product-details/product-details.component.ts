import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { ProductVariant } from '../models/product-variant.model';
import { CartService } from '../services/cart.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  product: Product;
  originalId: number = 0;
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
    const variantId = +this.route.snapshot.queryParamMap.get('variantId');
    this.originalId = +this.route.snapshot.paramMap.get('id')

    if (!variantId) { 
      this.getProductInfo(this.originalId); 
    } else {
      this.getProductInfo(variantId);
    }
    
    this.ps.getProductVariant(this.originalId)
    .subscribe(variants => this.variants = variants);
    
    this.route.queryParamMap.subscribe(params => {
      const variantId = +params.get('variantId');
      
      if (this.validVariant(variantId) && !this.isLoading) {
        this.getProductInfo(variantId);
      }
    });
  }

  validVariant(id: number): boolean {
    return id && this.variants.some(variant => {
      return variant.variantId === id;
    });
  }

  getProductInfo(productId: number): void {    
    if (!this.product) {
      this.isLoading = true;
    } else {
      this.reloading = true;
    }

    this.ps.getProductById(productId).pipe(delay(300))
    .subscribe(product => {
      this.product = product;
      this.isLoading = false;
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
