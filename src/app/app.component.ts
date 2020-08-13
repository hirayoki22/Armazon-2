import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hideNavbar: boolean = true;
  hideFooter: boolean = true;
  title = 'Armazon 2';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.hideUrlOnRoute();
  }

  private hideUrlOnRoute(): void {
    this.router.events.pipe(
      filter(events => events instanceof NavigationEnd)
    ).subscribe((navigation: NavigationEnd) => {
      const url = navigation.urlAfterRedirects;

      this.hideNavbar = url == '/user/login' || url == '/user/signup' || url == '/404';
      this.hideFooter = url == '/user/login' || url == '/user/signup' || url == '/404';
    });
  }
}
