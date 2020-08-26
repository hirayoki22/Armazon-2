import { Component, OnChanges } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';

import { ProductService } from 'src/app/product/services/product.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnChanges {
  @ViewChild('overlay') overlay: ElementRef<HTMLElement>;
  @Input() showSearchbox: boolean;
  @Output('showSearchbox') notifyChange = new EventEmitter<boolean>();
  control: FormControl = new FormControl(null);

  constructor(private ps: ProductService) { }

  ngOnChanges(): void {
    if (this.showSearchbox) {
      document.body.classList.add('active-sidepanel');

      fromEvent(window, 'keyup').subscribe((e: KeyboardEvent) => {
        if (e.key == 'Escape') { this.onClose(); }
      });
    } else {
      document.body.classList.remove('active-sidepanel');
    }
  }

  onClose(): void {
    const overlay = this.overlay.nativeElement;

    if (!this.overlay) { return; }

    overlay.classList.add('hide');
    window.onkeyup = null;

    setTimeout(() => {
      document.body.classList.remove('active-sidepanel');
      overlay.classList.remove('hide');

      this.showSearchbox = false;
      this.notifyChange.emit(this.showSearchbox);
    }, 300);
  }

  onClickOutside(e: MouseEvent): void {
    if (e.target == e.currentTarget) { this.onClose(); }
  }
}
