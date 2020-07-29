import { Component, OnChanges } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnChanges {
  @Input() openLightbox: boolean = false;

  constructor() { }

  ngOnChanges(): void {

  }
}
