import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormField } from './form-field.class';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Output('onSubmit') notifySubmit = new EventEmitter<FormGroup>();
  form: FormGroup;
  fields: FormField[] = [];

  constructor(private ds: DynamicFormService) { }

  ngOnInit(): void {
    this.ds.formInit$.subscribe(data => {
      this.form = data.form;
      this.fields = data.fields;
    });
  }

  onSubmit(): void {
    this.notifySubmit.emit(this.form);
  }
}
