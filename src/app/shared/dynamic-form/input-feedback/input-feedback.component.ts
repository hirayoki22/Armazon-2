import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormField, customFeedback } from '../form-field.class';

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
  @Input() customFeedback: customFeedback;

  get specialCondition(): boolean {
    return this.control.touched && !this.control.errors && 
    this.field.customFeedback && 
    this.field.fieldOrder == this.customFeedback.fieldOrder &&
    this.customFeedback.condition
  }

  constructor() { }

  ngOnInit(): void {
  }

}
