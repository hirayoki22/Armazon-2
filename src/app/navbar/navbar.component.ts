import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  itemCountSource: number = 0; 

  constructor(private cs: CartService) { }

  ngOnInit(): void {
    this.cs.itemCountSource$.subscribe(val => this.itemCountSource = val);
  }

}
