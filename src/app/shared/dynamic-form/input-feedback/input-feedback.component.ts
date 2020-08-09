import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormField } from '../form-field.class';
import { DynamicFormService } from '../dynamic-form.service';

@Component({
  selector: 'input-feedback',
  templateUrl: './input-feedback.component.html',
  styleUrls: ['./input-feedback.component.scss']
})
export class InputFeedbackComponent implements OnInit {
  @Input() field: FormField;
  form: FormGroup;
  
  get control() { return this.form.get(this.field.fieldKey); }

  get label(): string {
    return this.field?.fieldLabel.toLowerCase();
  }
  
  constructor(private ds: DynamicFormService) { }

  ngOnInit(): void {
    this.form = this.ds.form;
  }

}
