import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductVariant } from '../product-variant.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  @ViewChildren('navButton') navButtons: QueryList<ElementRef<HTMLButtonElement>>;
  @ViewChild('thumbnailList') thumbnailList: ElementRef<HTMLElement>;
  product: Product;
  variants: ProductVariant[] = [];
  activePreview: number = 0;
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
        this.navButtonsDisableState();
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

      this.activePreview = 0;      
      this.reolading = false;
      this.navButtonsDisableState();
    });
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'resize').subscribe(() => {
      this.navButtonsDisableState();
    });
  }

  onPreviewScroll(list: HTMLElement): void {
    const slides = Array.from(list.children);

    slides.forEach((slide, index) => {
      const rects = slide.getBoundingClientRect();
      const left = rects.left;

      if ((index != this.activePreview) && left <= list.clientWidth) {
        this.activePreview = index;
      }
    });
  }

  private navButtonsDisableState(): void {
    const list = this.thumbnailList.nativeElement;
    const navBtns = this.navButtons.map(btn => btn.nativeElement);

    if (list.clientWidth < (130 * this.product.images.length)) {
      navBtns[1].disabled = false;
    } else {
      navBtns[1].disabled = true;
    }
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

  onNavBtnClick(direction: 'before' | 'next'): void {
    const thumbnailList = this.thumbnailList.nativeElement;
    const steps = direction == 'before' ? -280 : 280;

    thumbnailList.scrollBy({ left: steps });
    this.thumbnailListScroll();
  }

  private thumbnailListScroll(): void {
    const thumbnailList = this.thumbnailList.nativeElement;
    const buttons = this.navButtons.map(btn => btn.nativeElement);
    
    fromEvent(thumbnailList, 'scroll').pipe(
      map(e => e.target as HTMLElement)
    ).subscribe(thumbnailList => {
      const scrolled = thumbnailList.scrollLeft;
      const limit = thumbnailList.scrollWidth - thumbnailList.clientWidth;

      buttons[0].disabled = scrolled > 0 ? false : true;
      buttons[1].disabled = scrolled >= limit ? true : false;
    });
  }

}
