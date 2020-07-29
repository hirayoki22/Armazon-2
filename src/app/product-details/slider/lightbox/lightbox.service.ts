import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {
  private currentImageSource = new Subject<number>();
  $currentImage = this.currentImageSource.asObservable();

  constructor() { }

  openLightbox(index: number): void {
    this.currentImageSource.next(index);
  }
}
