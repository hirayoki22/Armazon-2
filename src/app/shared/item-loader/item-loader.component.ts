import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'item-loader',
  templateUrl: './item-loader.component.html',
  styleUrls: ['./item-loader.component.scss'],
  animations: [
    trigger('showSpinner', [
      state('hide', style({
        visibility: 'hidden',
        opacity: 0
      })),
      state('show', style({
        visibility: 'visible',
        opacity: 1
      })),
      transition('hide <=> show', animate('0.4s ease'))
    ])
  ]
})
export class ItemLoaderComponent implements OnInit {
  fakeItemsCount: any = Array(4);
  @Input() isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
