import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ts: Title
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(events => events instanceof RouteConfigLoadEnd)
    ).subscribe((navigation: RouteConfigLoadEnd) => {
      const url = navigation;

      // console.log(this.route.firstChild.snapshot.data);
      this.changePageTitle();
    });
  }

  private changePageTitle(): void {
    const routeTitle = this.route.firstChild.snapshot.data['title'];
    this.ts.setTitle(routeTitle);
  }
}
