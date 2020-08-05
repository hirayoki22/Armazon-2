import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

const EMAIL_REGX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const INVALID_PASSWORDS = [
  'hello',
  'abcdef',
  'abcdefg',
  '00000',
  '12345',
  '01234'
];

export class OwnValidators {
  static email(control: AbstractControl): ValidationErrors | null {
    return !control.value || EMAIL_REGX.test(control.value.trim()) ? 
      null : { email: { invalid: true }};
  }

  static password(control: AbstractControl): ValidationErrors | null {
    return INVALID_PASSWORDS.some(val => control.value.match(val)) ?
      { password: { invalid: true } } : null;
  }

  static passwordMatch(form: FormGroup): ValidationErrors | null {
    const password = form.get('password').value;
    const repassword = form.get('rePassword').value;

    return repassword !== password ? 
      { rePassword: { noMatch: true } } : null;
  }
  
}