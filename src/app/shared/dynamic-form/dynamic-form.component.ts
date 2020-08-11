import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

import { FormField } from './form-field.class';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Input() submitBtnLabel: string = 'Submit';
  @Input() enableValidCSS: boolean = false;
  @Input() disableFeedback: boolean = false;
  @Input() submitOnInvalid: boolean = true;
  @Input() disableSubmit: boolean = false;
  @Input() validators: ValidatorFn | ValidatorFn[];
  @Output('onSubmit') notifySubmit = new EventEmitter<FormGroup>();
  form: FormGroup;

  constructor(private ds: DynamicFormService) { }

  ngOnInit(): void {
    this.form = this.ds.createForm(this.fields);
    this.form.setValidators(this.validators);
    this.ds.enableValidCSS = this.enableValidCSS;
  }

  onSubmit(): void {
    if (!this.disableSubmit) {
      this.notifySubmit.emit(this.form);
    }
  }

}
