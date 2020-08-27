import { Component, AfterViewInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input } from '@angular/core';

import { LightboxService } from '../../../services/lightbox.service';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

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
      this.openLightbox  = true;
      this.viewFullImage = false;
      this.currentImage  = data.index;
      this.moveIndicator();
      setTimeout(() => this.scrollIntoView(data.scrollBehavior));

      this.onScroll();
    });
  }

  private onScroll(): void {
    fromEvent(this.imageContainer.nativeElement, 'scroll').pipe(
      map(e => e.target as HTMLElement)
    ).subscribe(container => {
      const indicator = this.rangeIndicator.nativeElement;
      const range = indicator.parentElement;
      const limit = container.scrollWidth - container.clientWidth;
      const percentage = Math.round(container.scrollLeft / limit * 100);

      // console.log(range);
      indicator.style.transform = `translateX(${percentage}%)`;
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

      this.currentImage = (position > this.images.length - 1) ? 
      this.images.length - 1 : (position > 0) ? position : 0;
      
      this.ls.openLightbox({index: this.currentImage, scrollBehavior: 'smooth'});
    }
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.viewFullImage) { return; }

    const frame = <HTMLElement>e.currentTarget;
    const image = <HTMLImageElement>frame.firstChild;
    const rects = image.getBoundingClientRect();
    const mouseX = e.clientX - rects.left;
    const mouseY = e.clientY - rects.top;
    const posX   = (mouseX / rects.width) * 100;
    const posY   = (mouseY / rects.height) * 100;

    image.style.transformOrigin = `${posX}% ${posY}%`;
  }

  onClose(): void {
    this.openLightbox = false;
    this.currentImage = 0;
  }

}
    