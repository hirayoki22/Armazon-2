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

  constructor(private ps: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.onScroll();
  }

  private loadProducts(): void {
    this.ps.getProducts2(this.start, this.count).subscribe(products => {
      products.forEach(product => this.products.push(product));
      this.isloading = false;
    });
  }

  onScroll(): void {
    const container = document.documentElement;
    
    window.onscroll = () => {
      const limit = container.scrollHeight - container.clientHeight;
      
      if (window.scrollY == limit) {
        this.start += this.count;
        this.isloading = true;
        this.loadProducts();
      }
    }
  }
}
