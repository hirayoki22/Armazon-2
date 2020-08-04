import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  itemCount: number | string;
  hideNavbar: boolean = true;

  constructor(
    private cs: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.hideUrlOnRoute();
    this.initItemCount();

    this.cs.cartChange$.subscribe(() => this.initItemCount());
  }

  private hideUrlOnRoute(): void {
    this.router.events.pipe(
      filter(events => events instanceof NavigationEnd)
    ).subscribe((navigation: NavigationEnd) => {
      const url = navigation.urlAfterRedirects;

      this.hideNavbar = url.includes('login') || url.includes('signup');
    });
  }

  private initItemCount(): void {
    this.cs.getItemCount(1).subscribe(count => {
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
