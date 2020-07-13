import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { CartService } from '../cart.service';

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
    private ps: ProductService,
    private cs: CartService
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });

    this.route.paramMap.subscribe(params => {
      const productId = +params.get('id');

      this.ps.getProductById(productId).subscribe(product => {
        this.product = product;
        this.isLoading = false;
      });
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
  

  onChange(input: HTMLInputElement): void {
    const url = 'http:127.0.0.1/market-api/test.php';
    const form = new FormData();

    const product: Product = {
      productId: null,
      productName: 'Emeril Everyday 8 QT With Accessories Pressure Air Fryer, 5 Pc Pack, Silver',
      brand: 'Emeril Everyday',
      productDesc: 'Accessory Pack Includes : 1550 watt electric pressure cooker base, air fryer crisper lid, steam/air fryer basket, air fryer rack/multi-purpose roasting rack, pressure cooker lid, glass lid, stainless steel 8-qt pressure cooker pot, ladle, measuring cup, recipe book, Emeril Lagasse Cookbook with air fryer recipes, pressure cooker recipes, and pressure cooker/air fryer combo recipes',
      productImage: '',
      price: 149.99,
      totalStock: 115,
      categoryId: 7
    };

    form.append('product', JSON.stringify(product));
    form.append('images', input.files.item(1));

    fetch(url, {
      body: form
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.log(err.message));
  }

}
