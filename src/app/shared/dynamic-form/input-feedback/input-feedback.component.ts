import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SpecialFeedback } from '../dynamic-form.component';
import { FormField } from '../form-field.class';

@Component({
  selector: 'input-feedback',
  templateUrl: './input-feedback.component.html',
  styleUrls: [
    './input-feedback.component.scss',
    '../dynamic-form.component.scss'
  ]
})
export class InputFeedbackComponent implements OnInit {
  @Input() control: FormControl;
  @Input() field: FormField;
  @Input() fieldLabel: string;
  @Input() specialFeedback: SpecialFeedback;

  get specialCondition(): boolean {
    return this.control.touched && !this.control.errors && 
    this.field.customFeedback && 
    this.field.fieldOrder == this.specialFeedback.fieldOrder &&
    this.specialFeedback.condition
  }

  constructor() { }

  ngOnInit(): void {
  }

}
