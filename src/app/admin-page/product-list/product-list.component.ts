import { Component, OnInit } from '@angular/core';
import { ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  start: number = 0;
  count: number = 8;
  isloading: boolean = true;
  noMoreProducts: boolean = false;
  @ViewChildren('card') cards: QueryList<ElementRef<HTMLElement>>;

  constructor(private ps: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.ps.getProducts2(this.start, this.count).subscribe(products => {
      if (products.length) {
        products.forEach(product => this.products.push(product));
      } else {
        window.onscroll = null;
        this.noMoreProducts = true;
      }
      this.isloading = false;
      this.onScroll();
    });
  }

  onScroll(): void {
    const container = document.documentElement;  
  
    window.onscroll = () => {
      if (!this.noMoreProducts) {
        const cards = this.cards.map(card => card.nativeElement);  
        const rect = cards[cards.length - 2].getBoundingClientRect();
        
        if (rect.top < container.clientHeight) {
          window.onscroll = null;
          this.start += this.count;
          this.loadProducts();
        }
      }
    }
  }

}
