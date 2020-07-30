import { Component, OnInit, OnChanges } from '@angular/core';
import { ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

import { LightboxService } from './lightbox.service';

@Component({
  selector: 'lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements OnInit, OnChanges {
  @ViewChild('imageContainer') imageContainer: ElementRef<HTMLElement>; 
  @Input() images: string[];
  currentImage: number = 0;
  openLightbox: boolean = false;

  constructor(private ls: LightboxService) { }

  ngOnInit(): void {
    this.ls.$currentImage.subscribe(index => {
      this.currentImage = index;
      this.openLightbox = true;
      
      setTimeout(this.scrollIntoView, 400);
    });
  }

  ngOnChanges(): void {
    // console.log(this.currentImage);
  }

  scrollIntoView(): void {
    const list = Array.from(this.imageContainer.nativeElement.children);

    list[this.currentImage].scrollIntoView();
  }

  onNavButtonClick(direction: 'previous' | 'next'): void {
    switch (direction) {
      case 'previous':
        if (this.currentImage == 0) { return; }        
        this.currentImage--;
        break;

      case 'next':
        if (this.currentImage == this.images.length - 1) { return; }        
        this.currentImage++;
        break;
    
      default:
        console.log('Invalid direction: ', direction);
        break;
    }
    this.scrollIntoView();
  }

  onPreviewScroll(list: HTMLElement): void {
    const slides = Array.from(list.children);

    slides.forEach((slide, index) => {
      const rects = slide.getBoundingClientRect();
      const left = rects.left;

      if ((index != this.currentImage) && left <= list.clientWidth) {
        this.currentImage = index;
      }
    });
  }

  onClose(): void {
    this.openLightbox = false;
  }

}
    