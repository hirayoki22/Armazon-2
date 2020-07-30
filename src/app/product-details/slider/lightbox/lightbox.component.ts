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
  @Input() images: string[];
  currentImage: number = 0;
  openLightbox: boolean = false;

  constructor(private ls: LightboxService) { }

  ngAfterViewInit(): void {
    this.ls.$currentImage.subscribe(index => {
      this.currentImage = index;
      this.openLightbox = true;
      
      setTimeout(() => this.scrollIntoView('auto'));
    });
  }

  ngOnChanges(): void {
    
  }

  scrollIntoView(behavior: 'auto' | 'smooth' = 'smooth'): void {
    const list = Array.from(this.imageContainer.nativeElement.children);

    list[this.currentImage].scrollIntoView({ behavior: behavior });
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

  onClose(): void {
    this.openLightbox = false;
    this.currentImage = 0;
  }

}
    