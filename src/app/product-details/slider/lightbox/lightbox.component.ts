import { Component, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input } from '@angular/core';

import { LightboxService } from './lightbox.service';
import { LightboxData } from './lightbox.model';

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
    const range      = <HTMLElement>(e.currentTarget);
    const indicator  = this.rangeIndicator.nativeElement;
    const width      = indicator.getBoundingClientRect().width;
    const left       = indicator.getBoundingClientRect().left;
    const right      = indicator.getBoundingClientRect().right;
    const pageOffset = range.getBoundingClientRect().left;
    
    if (e.clientX < left || e.clientX > right) {
      const position = Math.floor((e.clientX - pageOffset) / width);

      this.currentImage = position > 0 ? position : 0;
      this.ls.openLightbox({index: this.currentImage, scrollBehavior: 'smooth'});
    }
  }

  viewFullImage: boolean = false;

  onImageClick(image: HTMLImageElement): void {
    this.viewFullImage = true;

    image.style.width  = `${image.naturalWidth / 2}px`;
    image.style.height = `${image.naturalHeight / 2}px`;
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.viewFullImage) { return; }

    const frame = <HTMLElement>e.currentTarget;
    const image = <HTMLImageElement>frame.firstElementChild;
    const frameLeft  = frame.getBoundingClientRect().left;
    const frameTop   = frame.getBoundingClientRect().top;

    const posX = (e.clientX - frameLeft) * -1;
    const posY = (e.clientY - frameTop) * -1;

    // image.style.transform = `translateX(${-300}px)`;
    // image.style.transform = `translateY(${posY}px)`;
    
    // frame.scrollTo({ top: e.clientX, left: e.clientY, behavior: 'smooth' });
    
    const left = ele.getBoundingClientRect().left - 1;
    const top = ele.getBoundingClientRect().top - 1;
    const right = ele.getBoundingClientRect().right + 1;
    const bottom = ele.getBoundingClientRect().bottom + 1;

    if (image.getBoundingClientRect().left > 0) {
      image.style.left = `${(e.clientX - left) - image.getBoundingClientRect().left}px`;
    }
  }

  onClose(): void {
    this.openLightbox = false;
    this.currentImage = 0;
  }

}
    