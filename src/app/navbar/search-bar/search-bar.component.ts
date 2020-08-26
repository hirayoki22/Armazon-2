import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

import { ProductService } from 'src/app/product/services/product.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() openSearchbox: boolean = false;

  constructor(private ps: ProductService) { }

  ngOnInit(): void {
  }

}
