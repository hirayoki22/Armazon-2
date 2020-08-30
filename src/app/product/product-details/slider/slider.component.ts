import { Component, OnChanges, AfterViewInit } from '@angular/core';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Input } from '@angular/core';
import { fromEvent } from 'rxjs';

import { LightboxService } from '../../services/lightbox.service';

@Component({
  selector: 'image-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnChanges, AfterViewInit {
  @ViewChildren('preview') previews: QueryList<ElementRef<HTMLElement>>;
  @Input() images: string[];
  altImages: string[];
  hasMoreImages: boolean = false;
  showAllImages: boolean = false;

  constructor(private ls: LightboxService) { }

  ngOnChanges(): void {
    this.altImages = this.images.slice(0, 4);
    this.hasMoreImages = this.images.length > this.altImages.length;
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'resize').subscribe(() => {
      this.resizeImagePreviews();
    });   
  }

  toggleAllImages(): void {
    this.altImages = this.altImages.length < this.images.length ?
    this.images : this.images.slice(0, 4);
  }

  resizeImagePreviews(): void {
    const previews = this.previews.map(pre => pre.nativeElement);

    previews.map(preview => {
      const width = preview.getBoundingClientRect().width;
      preview.style.height = `${width}px`;
    });
  }

  openLightbox(index: number): void {
    this.ls.openLightbox({index: index, scrollBehavior: 'auto'});
  }

}
