import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductVariant } from '../product-variant.model';
import { CartService } from '../cart/cart.service';
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
      const productId = +params.get('id');

      this.ps.getProductById(productId).subscribe(product => {
        this.product = product;        

        if (this.product.hasVariant) {
          this.ps.getProductVariant(this.product.productId)
          .subscribe(variants => this.variants = variants);
        }

        this.slider.images = this.product.images;
        this.slider.altImages = this.product.images.slice(0, 4);
        this.slider.navButtonsDisableState();
        this.isLoading = false;        
      });
    });
  }

  updateProductInfo(productId: number): void {    
    this.reloading = true;

    this.ps.getProductById(productId).subscribe(product => {
      // this.product = product;

      this.product.productName = product.productName;
      this.product.productDesc = product.productDesc;
      this.product.images = product.images;
      this.product.brand = product.brand;
      this.product.price = product.price;
      this.product.available = product.available;
      this.product.totalStock = product.totalStock;

      this.slider.images = this.product.images;      
      this.slider.activePreview = 0;
      this.slider.navButtonsDisableState();
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
