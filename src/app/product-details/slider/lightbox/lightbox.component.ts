import { Component, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnChanges {
  @Input() images: string[];
  @Input() openLightbox: boolean = false;
  @Output('openLightbox') notifyChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnChanges(): void {
    console.log(this.images);
  }

  onClose(): void {
    this.openLightbox = false;
    this.notifyChange.emit(this.openLightbox);
  }
}
