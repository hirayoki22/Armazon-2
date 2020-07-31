import { Component, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input } from '@angular/core';

import { LightboxService } from './lightbox.service';

@Component({
  selector: 'lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.scss']
})
export class LightboxComponent implements AfterViewInit {
  @ViewChild('imageContainer') imageContainer: ElementRef<HTMLElement>; 
  @ViewChild('rangeIndicator') rangeIndicator: ElementRef<HTMLElement>; 
  @Input() images: string[];
  currentImage: number = 0;
  openLightbox: boolean = false;
  viewFullImage: boolean = false;


  constructor(private ls: LightboxService) { }

  ngAfterViewInit(): void {
    this.ls.$currentImage.subscribe(data => {
      this.openLightbox = true;
      this.currentImage = data.index;
      this.moveIndicator();
      setTimeout(() => this.scrollIntoView(data.scrollBehavior));
    });
  }

  private scrollIntoView(behavior: 'auto' | 'smooth'): void {
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
    this.ls.openLightbox({index: this.currentImage, scrollBehavior: 'smooth'});
  }

  onRangeClick(e: MouseEvent): void {
    const indicator = this.rangeIndicator.nativeElement;
    const width     = indicator.getBoundingClientRect().width;
    const left      = indicator.getBoundingClientRect().left;
    const right     = indicator.getBoundingClientRect().right;
    const offset    = indicator.parentElement.offsetLeft;
    
    if (e.clientX < left || e.clientX > right) {
      const position = Math.floor((e.clientX - offset) / width);

      this.currentImage = position > 0 ? position : 0;
      this.ls.openLightbox({index: this.currentImage, scrollBehavior: 'smooth'});
    }
  }

  onImageClick(image: HTMLImageElement): void {
    this.viewFullImage = !this.viewFullImage;
    const frame = image.parentElement;

    if (this.viewFullImage) {
      frame.classList.add('.image-zoomed-in');
      frame.style.backgroundImage = `url(${this.images[this.currentImage]})`;
    } else {
      frame.classList.remove('.image-zoomed-in');
      frame.style.backgroundImage = 'none';
    }
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.viewFullImage) { return; }

    const image = <HTMLImageElement>e.currentTarget;
    const frame = image.parentElement;

    const left   = image.getBoundingClientRect().left;
    const top    = image.getBoundingClientRect().top;
    const right  = image.getBoundingClientRect().right;
    const bottom = image.getBoundingClientRect().bottom;


  }

  onClose(): void {
    this.openLightbox = false;
    this.currentImage = 0;
  }

}
    