import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { CartService } from '../cart.service';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit {
  @ViewChildren('navButton') navButtons: QueryList<ElementRef<HTMLButtonElement>>;
  @ViewChild('thumbnailList') thumbnailList: ElementRef<HTMLElement>;
  product: Product;
  activePreview: number = 0;
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.navButtonsDisableState();
      
      fromEvent(window, 'resize').subscribe(() => {
        this.navButtonsDisableState();
      });
    }, 300);
  }

  private navButtonsDisableState(): void {
    const list = this.thumbnailList.nativeElement;
    const navBtns = this.navButtons.map(btn => btn.nativeElement);

    if (list.scrollWidth > list.clientWidth) {
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
    const steps = direction == 'before' ? -268 : 268;

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
