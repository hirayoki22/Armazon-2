import { Injectable } from '@angular/core';
import { FormField } from './form-field.class';
import { FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() { }

  createForm(fields: FormField[]): FormGroup {
    let form: {} = {};

    fields.sort((a, b) => a.fieldOrder - b.fieldOrder);

    fields.forEach(field => {
      if (!field.validators.async) {
        form[field.fieldKey] = new FormControl(
          field.value, 
          field?.validators?.sync
        );
      } else {
        form[field.fieldKey] = new FormControl(
          field.value, 
          {          
            validators: field?.validators?.sync,
            asyncValidators: field?.validators?.async,
            updateOn: 'blur'
          }
        );
      }
    });
    return new FormGroup(form);
  }
}