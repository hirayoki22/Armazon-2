import { Component, OnInit } from '@angular/core';

import { ShoppingBagService } from '../product/services/shopping-bag.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  itemCount: number | string;
  showSearchbox: boolean = false;

  constructor(private cs: ShoppingBagService) { }

  ngOnInit(): void {
    this.initItemCount();

    this.cs.bagChange$.subscribe(() => {
      this.initItemCount()
    });
  }

  private initItemCount(): void {
    this.cs.itemCount.subscribe(count => {
      this.itemCount = this.formatItemCount(count);
    });
  }

  private formatItemCount(count: number): number | string {
    return (count > 0 && count) < 100 ? count : (count >= 100) ? '99+' : null;
  }

  openCart(): void {
    this.cs.openShoppingBag(true);
  }
}
