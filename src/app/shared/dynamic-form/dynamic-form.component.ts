import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { FormField } from './form-field.class';
import { OwnValidators } from '../validators/sync-validators';
import { MyAsyncValidators } from '../validators/async-validators.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  @Output('onSubmit') notifySubmit = new EventEmitter<FormGroup>();
  @Input() fields: FormField[] = [
    new FormField({
      fieldType: 'input',
      fieldKey: 'password',
      fieldLabel: 'Password',
      fieldOrder: 4,
      inpuType: 'password',
      validators: {
        sync: [ Validators.required, OwnValidators.password ]
      }
    }),
    new FormField({
      fieldType: 'input',
      fieldKey: 'firstName',
      fieldLabel: 'First name',
      fieldOrder: 1,
      validators: {
        sync: [ Validators.required ]
      }
    }),
    new FormField({
      fieldType: 'input',
      fieldKey: 'email',
      fieldLabel: 'Email address/username',
      fieldOrder: 3,
      inpuType: 'email',
      validators: {
        sync: [ Validators.required, OwnValidators.email ],
        async: [ this.asyncValidators.emailValidator() ]
      }
    }),
    new FormField({
      fieldType: 'input',
      fieldKey: 'lastName',
      fieldLabel: 'Last name',
      fieldOrder: 2,
      // validators: {
      //   sync: [ Validators.required ]
      // }
    })
  ];

  get sortedFields(): FormField[] {
    return this.fields.map(field => field)
    .sort((a, b) => a.fieldOrder - b.fieldOrder);
  }

  constructor(private asyncValidators: MyAsyncValidators) { }

  ngOnInit(): void {
    this.form = this.initFormGroup();
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
    console.log(this.form);
    this.notifySubmit.emit(this.form);
  }
}
