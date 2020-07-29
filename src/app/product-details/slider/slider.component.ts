import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, AfterViewInit {
  @ViewChildren('navButton') navButtons: QueryList<ElementRef<HTMLButtonElement>>;
  @ViewChildren('preview') previews: QueryList<ElementRef<HTMLElement>>;
  @ViewChild('thumbnailList') thumbnailList: ElementRef<HTMLElement>;
  images: string[] = [];
  activePreview: number = 0;
  showAllImages: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'resize').subscribe(() => {
      this.navButtonsDisableState();
      this.resizeImagePreviews();
    });   
  }

  resizeImagePreviews(): void {
    const previews = this.previews.map(pre => pre.nativeElement);
    
    setTimeout(() => {
      previews.map(preview => {
        const width = preview.getBoundingClientRect().width;
        preview.style.height = `${width}px`;
      });
    }, 200);
  }

  onNavBtnClick(direction: 'before' | 'next'): void {
    const thumbnailList = this.thumbnailList.nativeElement;
    const steps = direction == 'before' ? -280 : 280;

    thumbnailList.scrollBy({ left: steps });
    this.thumbnailListScroll();
  }

  onPreviewScroll(list: HTMLElement): void {
    const slides = Array.from(list.children);

    slides.forEach((slide, index) => {
      const rects = slide.getBoundingClientRect();
      const left = rects.left;

      if ((index != this.activePreview) && left <= list.clientWidth) {
        this.activePreview = index;
      }
    });
  }

  navButtonsDisableState(): void {
    const list = this.thumbnailList.nativeElement;
    const navBtns = this.navButtons.map(btn => btn.nativeElement);

    if (list.clientWidth < (130 * this.images.length)) {
      navBtns[1].disabled = false;
    } else {
      navBtns[1].disabled = true;
    }
  }

  private thumbnailListScroll(): void {
    const thumbnailList = this.thumbnailList.nativeElement;
    const buttons = this.navButtons.map(btn => btn.nativeElement);
    
    fromEvent(thumbnailList, 'scroll').pipe(
      map(e => e.target as HTMLElement)
    ).subscribe(thumbnailList => {
      const scrolled = thumbnailList.scrollLeft;
      const limit = thumbnailList.scrollWidth - thumbnailList.clientWidth;

      buttons[0].disabled = scrolled > 0 ? false : true;
      buttons[1].disabled = scrolled >= limit ? true : false;
    });
  }

}
