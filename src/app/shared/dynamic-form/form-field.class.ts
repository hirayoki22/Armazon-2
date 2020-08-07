import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

interface SelectOption { key: string| number, value: any };

export class FormField {
  fieldType: 'input' | 'select' | 'textarea';
  fieldKey: string;
  fieldLabel: string;
  fieldOrder: number;
  inpuType: 'text' | 'password' | 'email' | 'radio' | 'checkbox' | 'file';
  value: any;
  validators: {
    sync?: ValidatorFn[],
    async?: AsyncValidatorFn[]
  };
  selectOptions: SelectOption[];

  constructor(params: {
    fieldType: 'input' | 'select' | 'textarea',
    fieldKey: string,
    fieldLabel: string,
    fieldOrder?: number,
    inpuType?: 'text' | 'password' | 'email' | 'radio' | 'checkbox' | 'file',
    value?: any,
    validators?: {
      sync?: ValidatorFn[],
      async?: AsyncValidatorFn[]
    }
  }) {
    this.fieldType  = params.fieldType;
    this.fieldKey   = params.fieldKey   || '';
    this.fieldLabel = params.fieldLabel || this.fieldKey;
    this.fieldOrder = params.fieldOrder || 1;
    this.inpuType   = params.inpuType   || 'text';
    this.value      = params.value      || null;
    this.validators = params.validators || null;
  }
}