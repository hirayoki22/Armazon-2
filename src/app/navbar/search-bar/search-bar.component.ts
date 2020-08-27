import { Component, OnChanges } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, fromEvent, of } from 'rxjs';
import { map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ProductService } from 'src/app/product/services/product.service';
import { FormControl } from '@angular/forms';
import { SrchMatch } from 'src/app/product/models/srch-match.model';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnChanges {
  @ViewChild('overlay') overlay: ElementRef<HTMLElement>;
  @Input() showSearchbox: boolean;
  @Output('showSearchbox') notifyChange = new EventEmitter<boolean>();
  srchControl: FormControl = new FormControl(null);
  matches$: Observable<SrchMatch[]>;
  srchHistory: SrchMatch[];
  isFocused: boolean = false;

  constructor(
    private router: Router,
    private ps: ProductService
  ) { }

  ngOnChanges(): void {
    if (this.showSearchbox) {
      this.srchHistory = localStorage.getItem('search-history') ?
      JSON.parse(localStorage.getItem('search-history')) : null;
      
      this.matches$ = this.srchControl.valueChanges.pipe(
        map(keyword => keyword?.toLowerCase().trim()),
        distinctUntilChanged(),
        debounceTime(25),
        switchMap(keyword => {
          return keyword?.length ? this.ps.searchProduct(keyword) : of ([]);
        })
      );
        
      document.body.classList.add('active-sidepanel');
      fromEvent(window, 'keyup').subscribe((e: KeyboardEvent) => {
        if (e.key == 'Escape') { this.onClose(); }
      });
    } else {
      document.body.classList.remove('active-sidepanel');
    }
  }

  beginSearch(): void {
    this.router.navigate(
      ['/products'],
      {
        queryParams: { 
          keyword: this.srchControl.value.trim().toLowerCase()
        }
      }
    );
    this.onClose();
  }

  clearSrchHistory(): void {
    localStorage.removeItem('search-history');
    this.srchHistory = null;
  }

  onClose(): void {
    const overlay = this.overlay.nativeElement;

    if (!this.overlay) { return; }

    this.srchControl.reset();
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
