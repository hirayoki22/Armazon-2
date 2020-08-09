import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  get currentYear(): number {
    return new Date().getFullYear();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
