import { Component, OnInit } from '@angular/core';

import { UserService } from '../user/services/user.service';
import { CartService } from '../product/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  itemCount: number | string;

  constructor(
    private us: UserService,
    private cs: CartService
  ) { }

  ngOnInit(): void {
    this.us.isLoggedin.subscribe(loggedin => {
      if (loggedin) {
        this.initItemCount();

        this.cs.cartChange$.subscribe(() => {
          this.initItemCount()
        });
      }
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
    this.cs.openShoppingCart(true);
  }
}
