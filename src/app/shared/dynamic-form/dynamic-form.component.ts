import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormField } from './form-field.class';
import { DynamicFormService } from './dynamic-form.service';

export interface SpecialFeedback { fieldOrder: number; condition: boolean }

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Input() onInvalidDisabled: boolean;
  @Output('onSubmit') notifySubmit = new EventEmitter<FormGroup>();
  form: FormGroup;

  constructor(private ds: DynamicFormService) { }

  ngOnInit(): void {
    this.form = this.ds.createForm(this.fields);
  }

  onSubmit(): void {
    this.notifySubmit.emit(this.form);
  }

}
