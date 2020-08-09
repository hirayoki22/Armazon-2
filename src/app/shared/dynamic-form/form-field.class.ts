import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

interface SelectOption { key: string | number, value: any };
export interface customFeedback { condition: boolean, message: string };

export class FormField {
  fieldType: 'input' | 'dropdown' | 'textarea';
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
  customFeedback: customFeedback;

  constructor(params: {
    fieldType: 'input' | 'dropdown' | 'textarea',
    fieldKey: string,
    fieldLabel: string,
    fieldOrder?: number,
    inpuType?: 'text' | 'password' | 'email' | 'radio' | 'checkbox' | 'file',
    value?: any,
    validators?: {
      sync?: ValidatorFn[],
      async?: AsyncValidatorFn[]
    },
    selectOptions?: { [key: string]: any }[],
    customFeedback?: customFeedback;
  }) {
    this.fieldType  = params.fieldType;
    this.fieldKey   = params.fieldKey   || '';
    this.fieldLabel = params.fieldLabel || this.fieldKey;
    this.fieldOrder = params.fieldOrder || 1;
    this.inpuType   = params.inpuType   || 'text';
    this.value      = params.value      || null;
    this.validators = params.validators || null;
    this.selectOptions = this.formatedOptions(params.selectOptions);
    this.customFeedback = params.customFeedback || null;
  }

  formatedOptions(options: any[]): SelectOption[] {
    let formated = [];

    if (!options) {
      return [];
    } else {
      options.forEach(option => {
        formated.push({
          key:   option[Object.keys(option)[1]],
          value: option[Object.keys(option)[0]]
        });
      });
    }
    return formated;
  }
}