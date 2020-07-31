import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[image-loader]'
})
export class ImageLoaderDirective {
  @Input() initialTransition = ''; 

  constructor(private image: ElementRef<HTMLImageElement>) { 
    this.defaultStyling();
  }

  private defaultStyling() {
    this.image.nativeElement.style.visibility = 'hidden';
    this.image.nativeElement.style.opacity = '0';
    this.image.nativeElement.style.transition = 'opacity 0.3s ease';
  }

  @HostListener('load') onImageLoad() {
    const image = this.image.nativeElement;
    const interval = setInterval(() => {
      if (image.naturalWidth > 0 && image.naturalHeight > 0) {
        this.afterRenderStyle();               
        clearInterval(interval);
      }
    }, 10);
  }

  private afterRenderStyle() {
    this.image.nativeElement.style.visibility = 'visible';
    this.image.nativeElement.style.opacity = '1';
  }
}
