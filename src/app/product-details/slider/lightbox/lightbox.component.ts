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
      this.openLightbox = true;
      this.scrollIntoView(index);
    });
  }

  ngOnChanges(): void {
    // console.log(this.currentImage);
  }

  onClose(): void {
    this.openLightbox = false;
  }

  scrollIntoView(index: number): void {
    const list = this.imageContainer.nativeElement;

    list.children.item(index).scrollIntoView({ block: 'center', inline: 'center'});
    console.log(list.children.item(index));
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
}
    