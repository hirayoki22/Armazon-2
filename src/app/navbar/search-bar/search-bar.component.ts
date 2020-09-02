import { Component, OnChanges } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, fromEvent, of } from 'rxjs';
import { map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ProductService } from 'src/app/product/services/product.service';
import { FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
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
  srchForm: FormGroup = new FormGroup({
    srchControl: new FormControl(null, Validators.required)
  });
  matches$: Observable<SrchMatch[]>;
  srchHistory: SrchMatch[];
  isFocused: boolean = false;

  get srchControl(): AbstractControl {
    return this.srchForm.get('srchControl');
  }

  srchMatchHighlight(name: string): string {
    return name.slice(0, this.srchControl.value.length).toLowerCase();
  }

  srchMatchRemainder(name: string): string {
    return name.slice(this.srchControl.value.length).toLowerCase();
  }

  constructor(
    private router: Router,
    private ps: ProductService
  ) { }

  ngOnChanges(): void {
    if (this.showSearchbox) {
      this.srchHistory = localStorage.getItem('search-history') ?
      JSON.parse(localStorage.getItem('search-history')) : null;
      
      this.matches$ = this.srchForm.get('srchControl').valueChanges.pipe(
        map(keyword => keyword?.toLowerCase()?.trim()),
        distinctUntilChanged(),
        debounceTime(25),
        switchMap(keyword => {
          return keyword?.length ? this.ps.searchProduct(keyword) : of ([]);
        })
      );
      
      document.body.classList.add('active-modal');
      fromEvent(window, 'keyup').subscribe((e: KeyboardEvent) => {
        if (e.key == 'Escape') { this.onClose(); }
      });
    } else {
      document.body.classList.remove('active-modal');
    }
  }

  onSubmit(): void {
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
    if (!this.overlay) { return; }
    
    const overlay = this.overlay.nativeElement;

    overlay.classList.add('hide');
    window.onkeyup = null;
    
    setTimeout(() => {
      document.body.classList.remove('active-modal');
      
      this.showSearchbox = false;
      this.notifyChange.emit(this.showSearchbox);
      this.srchForm.reset();
    }, 300);
  }

  onClickOutside(e: MouseEvent): void {
    if (e.target == e.currentTarget) { this.onClose(); }
  }
}
