import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormField } from '../form-field.class';

@Component({
  selector: 'input-feedback',
  templateUrl: './input-feedback.component.html',
  styleUrls: [
    './input-feedback.component.scss',
    '../dynamic-form.component.scss'
  ]
})
export class InputFeedbackComponent implements OnInit, OnChanges {
  @Input() control: FormControl;
  @Input() field: FormField;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.field?.customFeedback?.condition) {
      console.log(this.field)
    }
  }

}
