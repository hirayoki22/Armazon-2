import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { FormField } from '../form-field.class';


@Component({
  selector: 'text-field',
  templateUrl: './text-field.component.html',
  styleUrls: [
    './text-field.component.scss',
    '../dynamic-form.component.scss'
  ]
})
export class TextFieldComponent implements ControlValueAccessor {
  @Input() inputClass: 'valid' | 'invalid';
  @Input() inputType: string;
  @Input() field: FormField;
  @Input() control: FormControl;
  onChange: Function;
  value: any = null;
  showPassword: boolean = false;

  constructor(private host: ElementRef<HTMLInputElement>) { }

  @HostListener('change', ['$event.target.value']) emitValue(value: any) {
    this.value = value;
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

  ngOnInit(): void {
  }

}
