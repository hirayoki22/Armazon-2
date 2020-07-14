import { Component, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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
  file: File | null = null;
  previews: string[] = [];

  constructor(private host: ElementRef<HTMLInputElement>) { }

  @HostListener('change', ['$event.target.files']) emitFiles(files: FileList) {
    this.file = files.item(0);
    
    if (this.file) {
      this.onChange(this.file);
    }
  }

  writeValue(value: null) {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(callback: Function) {
    this.onChange = callback;
  }

  registerOnTouched(callback: Function) { }

}
