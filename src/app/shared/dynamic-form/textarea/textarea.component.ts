import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../form-field.class';
import { SpecialFeedback } from '../dynamic-form.component';

@Component({
  selector: 'dynamic-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: [
    './textarea.component.scss',
    '../dynamic-form.component.scss'
  ]
})
export class TextareaComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() field: FormField;
  @Input() specialFeedback: SpecialFeedback;
  showPassword: boolean = false;
 
  get control() { return this.form.get(this.field.fieldKey); }

  constructor() { }

  ngOnInit(): void {
  }

}
