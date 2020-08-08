import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { delay } from 'rxjs/operators';

import { FormField } from './form-field.class';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  fields: FormField[] = [];
  @Input() selectOptions: any[];
  @Output('onSubmit') notifySubmit = new EventEmitter<FormGroup>();

  constructor(private ds: DynamicFormService) { }

  ngOnInit(): void {
    this.ds.fields$.pipe(delay(100)).subscribe(fields => {
      fields.sort((a, b) => a.fieldOrder - b.fieldOrder);
      this.fields = fields;

      this.form = this.initFormGroup();
    });
  }

  getControl(key: string) { return this.form.get(key); }

  initFormGroup(): FormGroup {
    let form: {} = {};

    this.fields.forEach(field => {
      form[field.fieldKey] = new FormControl(
        field.value, 
        {          
          validators: field?.validators?.sync,
          asyncValidators: field?.validators?.async,
          updateOn: 'blur'
        }
      );
    });
    return new FormGroup(form);
  }

  onSubmit(): void {
    this.notifySubmit.emit(this.form);
  }
}
