import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private ts: Title
  ) { }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });

    this.route.data.subscribe(res => console.log(res));

    this.ts.setTitle(this.route.firstChild.snapshot.data['title']);
  }

}
