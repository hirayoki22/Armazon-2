import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: [
    './dropdown.component.scss',
    '../dynamic-form.component.scss'
  ],
  providers:[{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DropdownComponent,
    multi: true
  }]
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() inputClass: 'valid' | 'invalid';
  @Input() options: { key: string | number, value: any }[];
  onChange: Function;
  value: any = null;

  constructor(private host: ElementRef<HTMLInputElement>) { }

  @HostListener('change', ['$event.target.value']) emitValue(value: any) {
    this.value = +value;
    if (this.value) { this.onChange(this.value); }
  }

  writeValue(value: null) {
    this.host.nativeElement.value = '';
    this.value = null;
  }

  registerOnChange(callback: Function) {
    this.onChange = callback;
  }

  registerOnTouched(callback: Function) { }
}
