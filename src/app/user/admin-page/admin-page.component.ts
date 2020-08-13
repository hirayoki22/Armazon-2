import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const title = <HTMLTitleElement>document.head.querySelector('title');
    title.textContent = 'Admin Page';
  }

}
