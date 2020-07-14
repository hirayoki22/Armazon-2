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
  files: File[] | null = [];

  constructor(
    private sanitizer: DomSanitizer,
    private host: ElementRef<HTMLInputElement>
  ) { }


  @HostListener('change', ['$event.target.files']) emitFiles(files: FileList) {
    Array.from(files).forEach(file => this.files.push(file));
    
    if (this.files && this.files.length) {
      this.onChange(this.files);
    }
  }

  getImageUrl(file: File) {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }

  onRemove(file: File, previewEle: HTMLElement): void {
    previewEle.classList.add('removed');
    
    setTimeout(() => {
      this.files = this.files.filter(cur => cur.name !== file.name);
      this.onChange(this.files);
    }, 300);
  }

  writeValue(value: null) {
    this.host.nativeElement.value = '';
    this.files = [];
  }

  registerOnChange(callback: Function) {
    this.onChange = callback;
  }

  registerOnTouched(callback: Function) { }

}
