import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { Product } from '../product.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private _cartItems: Product[] = []
  cartItems: Product[] = [{"productId":1,"productName":"Mehron Makeup Stage Blood (16 Ounce) (Dark Venous)","productDesc":"Great fake blood for Halloween and Special effects looks for children and adults alike","productImage":"assets\/img\/product-images\/product1.jpg","price":19.51,"availability":true,"totalStock":15},{"productId":2,"productName":"Mehron Makeup SynWax Synthetic Modeling Wax (10 ounce)","productDesc":"Perfect for creating injuries, cuts, and scars on moving body parts","productImage":"assets\/img\/product-images\/product2.jpg","price":21.21,"availability":true,"totalStock":7},{"productId":3,"productName":"Mehron Makeup Paradise AQ Face & Body Paint 8 Color Palette (Nuance)","productDesc":"Find the exact color you need in the Paradise AQ range of dynamic palettes. Over 40 color options available! 8 colors included per palette","productImage":"assets\/img\/product-images\/product3.jpg","price":39.99,"availability":true,"totalStock":3},{"productId":4,"productName":"Mehron Makeup Paradise AQ Pro Face Paint Palette (30 Colors)","productDesc":"Each 30 color Paradise Makeup AQ Palette gives over 1000 applications","productImage":"assets\/img\/product-images\/product4.jpg","price":104.98,"availability":true,"totalStock":8},{"productId":5,"productName":"CCbeauty Professional Special Effects Stage Makeup Wax Fake Wound Moulding Scars Prosthetics","productDesc":"Professional makeup artists need to use this wax for any type of artistic makeup or special effects","productImage":"assets\/img\/product-images\/product5.jpg","price":12.99,"availability":true,"totalStock":23},{"productId":6,"productName":"Narrative Cosmetics 6 Color Bruise Wheel for Special Effects, Theatrical Makeup and Halloween","productDesc":"The Bruise Effects Wheel is a highly pigmented, color rich cream makeup used to create realistic bruises","productImage":"assets\/img\/product-images\/product6.jpg","price":16.99,"availability":true,"totalStock":14}];
  viewCart: boolean;

  get subtotal(): number {
    return Math.round(this.cartItems.map(item => item.price)
    .reduce((a, b) => a + b, 0));
  }

  get itemCount(): number {
    return this.cartItems.length;
  }

  constructor(private cs: CartService) { }

  ngOnInit(): void {
    // this.cartItems = this.cs.cartItems;

    // this.cs.cartViewState$.subscribe(state => {
    //   this.viewCart = state;
    //   document.body.classList.add('active-overlay');
    // });
  }

  onClose(): void {
    const overlay = document.querySelector('.overlay');
    const section = document.querySelector('.cart-container');

    section.classList.add('slide-out');
    overlay.classList.add('hide');

    setTimeout(() => {
      this.viewCart = false;
      document.body.classList.remove('active-overlay');
      overlay.classList.remove('hide');
      section.classList.remove('slide-out');
    }, 400);
  }

  onRemove(productId: number): void {
    this.cs.removeFromCart(productId);
    this.cartItems = this.cs.cartItems;
  }

  textClipper(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + ' . . .' : text;
  }

  checkItemQuantity(): void {

  }

}
