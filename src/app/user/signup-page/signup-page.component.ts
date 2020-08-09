import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  signupForm: FormGroup;  // temp
  showPassword: boolean = false;  // temp
  showRePassword: boolean = false; // temp
  isLoading: boolean = false;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  constructor(
    private router: Router,
    private us: UserService,
    private fb: FormBuilder,
    private emailValidator: MyAsyncValidators
  ) { }

  ngOnInit(): void {
    this.signupForm = this.initSignupForm();  // temp
  }

  private initSignupForm(): FormGroup {  // temp
    return this.fb.group({
      firstName:  [ null, [ Validators.required, Validators.pattern(/^[A-zÀ-ú\s]+$/) ] ],
      lastName:   [ null, [ Validators.required, Validators.pattern(/^[A-zÀ-ú\s]+$/) ] ],
      mobile:     [ null, [ OwnValidators.mobile] ],
      email:      [ 
        null,
        {
          validators: [ Validators.required, OwnValidators.email ],
          asyncValidators: [this.emailValidator.emailValidator()],
          updateOn: 'blur'
        }
      ],
      password:   [ 
        null, 
        [ 
          Validators.required, 
          Validators.minLength(5),
          OwnValidators.password 
        ] 
      ],
      rePassword: [ null, [ Validators.required ] ],
    },
    {
      validators: OwnValidators.passwordMatch
    });
  }

  get firstName()  { return this.signupForm.get('firstName'); }  // temp
  get lastName()   { return this.signupForm.get('lastName'); }  // temp
  get mobile()     { return this.signupForm.get('mobile'); }  // temp
  get email()      { return this.signupForm.get('email'); }  // temp
  get password()   { return this.signupForm.get('password'); }  // temp
  get rePassword() { return this.signupForm.get('rePassword'); }  // temp

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
      firstName: toCapitalize(this.firstName.value),
      lastName:  toCapitalize(this.lastName.value),
      mobile:    phoneFormatter(this.mobile.value),
      email:     this.email.value,
      password:  this.password.value
    }
  }

  onSubmit(): void {
    // this.isLoading = true;
    // this.us.signupRequest(this.formSantize).subscribe(state => {
    //   if (state.success) {
    //     this.router.navigate(['/user/login']);
    //   }
    //   this.isLoading = false;
    // });
  }

  private getFields(): FormField[] {
    return [
      new FormField({
        fieldType: 'input',
        fieldKey: 'username',
        fieldLabel: 'Username or email address',
        fieldOrder: 1,
        inpuType: 'email',
        validators: {
          sync: [ Validators.required ]
        }
      }),
      new FormField({
        fieldType: 'input',
        fieldKey: 'password',
        fieldLabel: 'Password',
        fieldOrder: 2,
        inpuType: 'password',
        validators: {
          sync: [ Validators.required ]
        }
      })
    ]
  }
}