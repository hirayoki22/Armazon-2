import { Component, OnInit, OnChanges } from '@angular/core';
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
export class SpinnerComponent implements OnInit, OnChanges {
  @Input() loading: boolean = false;
  @Input() overlayStyle: 'fixed' | 'absolute';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setBodyOverflow();
  }

  setBodyOverflow(): void {
    if (this.overlayStyle === 'fixed') {
      if (!this.loading) {
        document.body.classList.remove('active-spinner');
      } else {
        document.body.classList.add('active-spinner');
      }
    }
  }
}
