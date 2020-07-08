import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  animations: [
    trigger('showSpinner', [
      state('hide', style({
        visibility: 'hidden',
        opacity: 0,
        transform: 'scale(1.5, 1.5)'
      })),
      state('show', style({
        visibility: 'visible',
        opacity: 1,
        transform: 'scale(1, 1)'
      })),
      transition('hide <=> show', animate('0.4s ease'))
    ])
  ]
})
export class SpinnerComponent implements OnInit {
  @Input() loading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
