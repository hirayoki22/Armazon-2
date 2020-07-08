import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

import { Product } from '../product.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  products: Product[] = [];

  constructor(private ps: ProductService) { }

  ngOnInit(): void {
    this.ps.getProducts().subscribe(prodcuts => this.products = prodcuts);
  }

}
