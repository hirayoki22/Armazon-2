import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

const EMAIL_REGX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONE_REGX = /^[1]?[-.\s]?(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
const INVALID_PASSWORDS = [
  'hello',
  'abcdef',
  'abcdefg',
  '00000',
  '12345',
  '01234'
];

export class OwnValidators {
  static phone(control: AbstractControl) {
    return PHONE_REGX.test(control.value.trim()) ? 
      { password: { invalid: true } } : null;
  }

  static email(control: AbstractControl): ValidationErrors | null {
    return EMAIL_REGX.test(control.value.trim()) ? 
      { email: { invalid: true }} : null;
  }

  static password(control: AbstractControl): ValidationErrors | null {
    return INVALID_PASSWORDS.some(val => control.value.match(val)) ?
      { password: { invalid: true } } : null;
  }

  static passwordMatch(form: FormGroup): ValidationErrors | null {
    return form.get('rePassword').value !== form.get('password').value ? 
      { rePassword: { noMatch: true } } : null;
  }
  
}