import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductVariant } from '../product-variant.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
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

    this.route.paramMap.subscribe(params => {
      const productId = +params.get('id');

      this.ps.getProductById(productId).subscribe(product => {
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
    this.reolading = true;

    this.ps.getProductById(productId).subscribe((product: Product) => {
      this.product.productId = product.productId;
      this.product.productName = product.productName;
      this.product.available = product.available;
      this.product.productDesc = product.productDesc;
      this.product.price = product.price;
      this.product.totalStock = product.totalStock;
      
      // if (!this.product.images.some(img => img == this.product.images[0])) {
      //   this.product.images = product.images;
      // }
      this.product.images = product.images;   
      this.reolading = false;
      // this.navButtonsDisableState();
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
