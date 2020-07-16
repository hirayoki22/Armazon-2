import { Component, OnInit } from '@angular/core';
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
  end: number = 4;
  isloading: boolean = false;

  constructor(private ps: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.ps.getProducts2(this.start, this.end).subscribe(products => {
      console.log(products);
      this.products.concat(products);
      this.isloading = false;
    });
  }

  onClick(): void {
    this.start += 4;
    this.end += this.start;

    this.loadProducts();
  }
}
