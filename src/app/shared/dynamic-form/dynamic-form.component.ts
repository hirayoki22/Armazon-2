import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormField } from './form-field.class';
import { OwnValidators } from '../validators/sync-validators';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  form: FormGroup;
  fields: FormField[] = [
    new FormField({
      fieldType: 'input',
      fieldKey: 'password',
      fieldLabel: 'Password',
      fieldOrder: 3,
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
      fieldOrder: 2,
      inpuType: 'email',
      validators: {
        sync: [ Validators.required, OwnValidators.email ]
      }
    })
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
