import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../form-field.class';
import { SpecialFeedback } from '../dynamic-form.component';

@Component({
  selector: 'text-field',
  templateUrl: './text-field.component.html',
  styleUrls: [
    './text-field.component.scss',
    '../dynamic-form.component.scss'
  ]
})
export class TextFieldComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() field: FormField;
  @Input() specialFeedback: SpecialFeedback;
  showPassword: boolean = false;
 
  get control() { return this.form.get(this.field.fieldKey); }

  constructor() { }

  ngOnInit(): void {
  }

}
