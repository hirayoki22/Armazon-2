import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormField } from '../form-field.class';
import { DynamicFormService } from '../dynamic-form.service';

@Component({
  selector: 'dynamic-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['../dynamic-form.component.scss']
})
export class TextFieldComponent implements OnInit {
  @Input() field: FormField;
  form: FormGroup;
  isFocused: boolean = false;
  enableValidCSS: boolean;
  showPassword: boolean = false;
 
  get control() { return this.form.get(this.field.fieldKey); }

  get inputClass(): {} {
    return {
      valid: this.enableValidCSS && this.control.dirty && this.control.valid,
      invalid: this.enableValidCSS && 
      (this.control.dirty && this.control.invalid) ||
      (this.control.dirty && this.form?.errors)
    }
  }

  constructor(private ds: DynamicFormService) { }

  ngOnInit(): void {
    this.form = this.ds.form;
    this.enableValidCSS = this.ds.enableValidCSS;
  }

}
