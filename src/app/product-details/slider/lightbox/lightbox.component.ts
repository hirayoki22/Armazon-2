import { Component, AfterViewInit, OnChanges } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input } from '@angular/core';

import { LightboxService } from './lightbox.service';

@Component({
  selector: 'lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements AfterViewInit, OnChanges {
  @ViewChild('imageContainer') imageContainer: ElementRef<HTMLElement>; 
  @ViewChild('rangeIndicator') rangeIndicator: ElementRef<HTMLElement>; 
  @Input() images: string[];
  currentImage: number = 0;
  openLightbox: boolean = false;

  constructor(private ls: LightboxService) { }

  ngAfterViewInit(): void {
    this.ls.$currentImage.subscribe(index => {
      this.currentImage = index;
      this.openLightbox = true;

      this.moveIndicator();
      setTimeout(() => this.scrollIntoView('auto'));
    });

    // this.onPreviewScroll();
  }

  ngOnChanges(): void {
  }

  private scrollIntoView(behavior: 'auto' | 'smooth' = 'smooth'): void {
    const slides = Array.from(this.imageContainer.nativeElement.children);

    slides[this.currentImage].scrollIntoView({ behavior: behavior });    
  }

  private moveIndicator(): void {
    const indicator = this.rangeIndicator.nativeElement;
    const steps = 100 * this.currentImage;

    indicator.style.transform = `translateX(${steps}%)`;
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
    this.moveIndicator();
  }


  onPreviewScroll(): void {
    const list = this.imageContainer.nativeElement;
    const slides = Array.from(list.children);

    // if (list.clientWidth > 768) { return; }

    // slides.forEach((slide, index) => {
    //   const rects = slide.getBoundingClientRect();
    //   const left = rects.left;

    //   if ((index != this.currentImage) && left <= list.clientWidth) {
    //     this.currentImage = index;
    //     this.moveIndicator();
    //   }
    // });
    let initial = list.scrollLeft;
    
    list.onscroll = () => {
      let last = list.scrollLeft;
      
      switch (true) {
        case initial > last:
          if (this.currentImage == 0) { return; }        
          this.currentImage--;
          break;
  
        case initial < last:
          if (this.currentImage == this.images.length - 1) { return; }        
          this.currentImage++;
          break;
      
        default:
          break;
      }
      console.log(this.currentImage);

      initial = last;
    }
  }

  onClose(): void {
    this.openLightbox = false;
    this.currentImage = 0;
  }

}
    