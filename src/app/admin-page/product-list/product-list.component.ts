import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  start: number = 0;
  count: number = 9;
  isloading: boolean = true;
  noMoreProducts: boolean = false;

  constructor(private ps: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.onScroll();
  }

  private loadProducts(): void {
    this.ps.getProducts2(this.start, this.count).subscribe(products => {
      if (products.length) {
        products.forEach(product => this.products.push(product));
      } else {
        this.noMoreProducts = true;
      }
      this.isloading = false;
    });
  }

  onScroll(): void {
    let prevScroll = window.scrollY;
    let nextScroll = 0;
    const container = document.documentElement;
    
    window.onscroll = () => {
      if (!this.noMoreProducts) {
        const limit = container.scrollHeight - container.clientHeight;

        // if (window.scrollY + 300 >= limit) {
        //   this.start += this.count;
        //   this.isloading = true;
        //   this.loadProducts();
        // }
        
      } else {
        window.onscroll = null;
      }
    }
  }
}
