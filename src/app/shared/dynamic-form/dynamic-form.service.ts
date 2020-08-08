import { Injectable } from '@angular/core';
import { FormField } from './form-field.class';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  private formSource = new Subject<{form: FormGroup, fields: FormField[]}>();
  formInit$ = this.formSource.asObservable();

  updateFields(fields: FormField[]): void {
    fields.sort((a, b) => a.fieldOrder - b.fieldOrder);

    this.formSource.next({
      form: this.initFormGroup(fields),
      fields: fields
    });
  }

  private initFormGroup(fields: FormField[]): FormGroup {
    let form: {} = {};

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