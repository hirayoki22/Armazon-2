import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnValidators } from '../../shared/validators/sync-validators';
import { MyAsyncValidators } from '../../shared/validators/async-validators.service';

import { UserService } from '../user.service';
import { SignupDetails } from '../user-signup.model';
import { FormField } from 'src/app/shared/dynamic-form/form-field.class';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  fields: FormField[];
  isLoading: boolean = false;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  get formValidator(): ValidatorFn {
    return OwnValidators.passwordMatch;
  }

  constructor(
    private router: Router,
    private us: UserService,
    private asyncValidator: MyAsyncValidators
  ) { }

  ngOnInit(): void {
    this.fields = this.getFields();
  }

  private sanitizeForm(form?: FormGroup): SignupDetails {
    const toCapitalize = (value: string) => {
      return value.toLowerCase().trim().split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    }
    
    const phoneFormatter = (phone: string) => {
      const PHONE_REGX = /^[1]?[-.\s]?(\(\d{3}\)|(\d{3}))[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
      return phone.replace(/[()]/g, '').replace(PHONE_REGX, '($1) $3-$4');
    }
    
    return {
      firstName: toCapitalize(form.get('firstName').value),
      lastName:  toCapitalize(form.get('lastName').value),
      mobile:    phoneFormatter(form.get('mobile').value),
      email:     form.get('email').value,
      password:  form.get('password').value
    }
  }

  onSubmit(form: FormGroup): void {
    this.isLoading = true;
    this.us.signupRequest(this.sanitizeForm(form)).subscribe(state => {
      if (state.success) {
        this.router.navigate(['/user/login']);
      } else {
        console.error('Unable to complete request: ', state.message);
      }
      this.isLoading = false;
    });
  }

  private getFields(): FormField[] {
    return [
      new FormField({
        fieldKey: 'firstName',
        fieldLabel: 'First name',
        fieldOrder: 1,
        validators: {
          sync: [ 
            Validators.required,
            Validators.pattern(/^[A-zÀ-ú\s]+$/)
          ]
        }
      }),
      new FormField({
        fieldKey: 'lastName',
        fieldLabel: 'Last name',
        fieldOrder: 2,
        validators: {
          sync: [ 
            Validators.required,
            Validators.pattern(/^[A-zÀ-ú\s]+$/)
          ]
        }
      }),
      new FormField({
        fieldKey: 'mobile',
        fieldLabel: 'Mobile (DO)',
        fieldOrder: 3,
        validators: {
          sync: [ 
            Validators.required,
            OwnValidators.mobile
          ]
        }
      }),
      new FormField({
        fieldKey: 'email',
        fieldLabel: 'Email address (username)',
        fieldOrder: 4,
        inpuType: 'email',
        validators: {
          sync: [
            Validators.required,
            OwnValidators.email 
          ],
          async: [ this.asyncValidator.emailValidator() ]
        }
      }),
      new FormField({
        fieldKey: 'password',
        fieldLabel: 'Password',
        fieldOrder: 5,
        inpuType: 'password',
        validators: {
          sync: [ 
            Validators.required,
            OwnValidators.password
          ]
        }
      }),
      new FormField({
        fieldKey: 'rePassword',
        fieldLabel: 'Re-enter your password',
        fieldOrder: 6,
        inpuType: 'password',
        validators: {
          sync: [ Validators.required ]
        }
      })
    ];
  }
}