import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  itemCount: number | string;

  constructor(private cs: CartService) { }

  ngOnInit(): void {
    this.cs.itemCount$.subscribe(count => {
      this.itemCount = (count > 0 && count) < 100 ? count : 
      (count >= 100) ? '99+' : null; 
    });
  }

  openCart(): void {
    this.cs.changeCartViewState(true);
  }
}
