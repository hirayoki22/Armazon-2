import { Component, OnChanges, AfterViewInit } from '@angular/core';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { fromEvent } from 'rxjs';

import { LightboxService } from './lightbox/lightbox.service';

@Component({
  selector: 'image-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnChanges, AfterViewInit {
  @ViewChildren('preview') previews: QueryList<ElementRef<HTMLElement>>;
  @Input() images: string[];
  altImages: string[];
  activePreview: number = 0;
  showAllImages: boolean = false;

  constructor(private ls: LightboxService) { }

  ngOnChanges(): void {
    this.altImages = this.images.slice(0, 4);
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'resize').subscribe(() => {
      this.resizeImagePreviews();
    });   
  }

  resizeImagePreviews(): void {
    const previews = this.previews.map(pre => pre.nativeElement);
    
    previews.map(preview => {
      const width = preview.getBoundingClientRect().width;
      preview.style.height = `${width}px`;
    });
  }

  openLightbox(index: number): void {
    this.ls.openLightbox(index);
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

}
