import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'item-loader',
  templateUrl: './item-loader.component.html',
  styleUrls: ['./item-loader.component.scss']
})
export class ItemLoaderComponent implements OnInit {
  fakeItemsCount: any = Array(5);
  @Input() isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
