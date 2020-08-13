import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ts: Title
  ) { }

  ngOnInit(): void {
    this.hideUrlOnRoute();
  }

  private hideUrlOnRoute(): void {
    this.router.events.pipe(
      filter(events => events instanceof NavigationEnd)
    ).subscribe((navigation: NavigationEnd) => {
      const url = navigation.urlAfterRedirects;

      // console.log(this.route.firstChild.snapshot.data);

      this.changePageTitle();
      this.hideNavbarFooter(url);
    });
  }

  private hideNavbarFooter(url: string): void {
    const routes = ['/user/login', '/user/signup', '/404'];
    
    this.hideNavbar = routes.includes(url);
    this.hideFooter = routes.includes(url);
  }

  private changePageTitle(): void {
    const routeTitle = this.route.firstChild.snapshot.data['title'];
    this.ts.setTitle(routeTitle ? routeTitle : this.title);
  }
}
