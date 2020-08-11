import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { LightboxData } from './lightbox.model';

@Injectable({
  providedIn: 'root'
})
export class LightboxService {
  private currentImageSource = new Subject<LightboxData>();
  $currentImage = this.currentImageSource.asObservable();

  constructor() { }

  openLightbox(data: LightboxData): void {
    this.currentImageSource.next(data);
  }
}
