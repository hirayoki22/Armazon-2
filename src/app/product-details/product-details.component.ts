import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductVariant } from '../product-variant.model';
import { CartService } from '../cart.service';
import { SliderComponent } from './slider/slider.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  @ViewChild(SliderComponent) slider: SliderComponent;
  product: Product;
  variants: ProductVariant[] = [];
  isLoading: boolean = true;
  reolading: boolean = false;


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
      const productId = +params.get('id');

      this.ps.getProductById(productId).subscribe(product => {
        this.product = product;
        this.slider.images = this.product.images;

        if (this.product.hasVariant) {
          this.ps.getProductVariant(this.product.productId)
          .subscribe(variants => this.variants = variants);
        }

        this.isLoading = false;        
        this.slider.navButtonsDisableState();
      });
    });
  }

  updateProductInfo(productId: number): void {    
    this.reolading = true;

    this.ps.getProductById(productId).subscribe(product => {
      this.product = product;
      this.slider.images = this.product.images;
      this.reolading = false;
      this.slider.activePreview = 0;
      this.slider.navButtonsDisableState();
    });
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
