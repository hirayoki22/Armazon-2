import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormField } from './form-field.class';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {
  private fieldsSource = new Subject<FormField[]>();
  fields$ = this.fieldsSource.asObservable();

  updateFields(fields: FormField[]): void {
    this.fieldsSource.next(fields);
  }
}