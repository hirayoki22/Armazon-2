import { Component, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ImageUploaderComponent,
    multi: true
  }]
})
export class ImageUploaderComponent implements ControlValueAccessor {
  onChange: Function;
  images: File[] | null = [];

  constructor(
    private sanitizer: DomSanitizer,
    private host: ElementRef<HTMLInputElement>
  ) { }


  @HostListener('change', ['$event.target.files']) emitFiles(images: FileList) {
    this.validateImages(images);
    console.log(this.host.nativeElement.value);
    if (this.images && this.images.length) {
      this.onChange(this.images);
    }
  }

  validateImages(files: FileList): void {
    if (this.images.length == 20) { return; }
    
    const images = Array.from(files).slice(0, 20);
    const allowedExts = ['image/jpeg', 'image/png', 'image/webp'];
    const maxImgSize = 5000000;

    images.forEach(image => {
      if (allowedExts.includes(image.type) && image.size <= maxImgSize) {
        this.images.push(image);
      }
    });
  }

  getImageUrl(file: File) {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  onRemove(file: File, previewEle: HTMLElement): void {
    previewEle.classList.add('removed');
    
    setTimeout(() => {
      this.images = this.images.filter(cur => cur.name !== file.name);
      this.onChange(this.images);
    }, 300);
  }

  writeValue(value: null) {
    this.host.nativeElement.value = value;
    this.images = [];
  }

  registerOnChange(callback: Function) {
    this.onChange = callback;
  }

  registerOnTouched(callback: Function) { }

}
