import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OwnValidators } from '../../shared/validators/sync-validators';
import { MyAsyncValidators } from '../../shared/validators/async-validators.service';

import { UserService } from '../user.service';
import { SignupDetails } from '../user-signup.model';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup;
  showPassword: boolean = false;
  showRePassword: boolean = false;
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
    this.signupForm = this.initSignupForm();
  }

  private initSignupForm(): FormGroup {
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

  get firstName()  { return this.signupForm.get('firstName'); }
  get lastName()   { return this.signupForm.get('lastName'); }
  get mobile()     { return this.signupForm.get('mobile'); }
  get email()      { return this.signupForm.get('email'); }
  get password()   { return this.signupForm.get('password'); }
  get rePassword() { return this.signupForm.get('rePassword'); }

  onSubmit(): void {
    // this.isLoading = true;
    // this.us.signupRequest(this.signupForm.value).subscribe(state => {
    //   console.log(state.success);
    //   this.isLoading = false;
    // });
    console.log(this.formSantize());
  }

  formSantize(): SignupDetails {
    const toCapitalize = (value: string) => {
      return value.toLowerCase().trim().split(' ')
      .map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
    }
    
    const phoneFormatter = (phone: string) => {
      const PHONE_REGX = /(^[1]?)[-.\s]?((\(\d{3}\)|\d{3}))[-.\s]?\d{3}[-.\s]?\d{4}$/;
      return '';
    }
    
    const details: SignupDetails = {
      firstName: toCapitalize(this.firstName.value),
      lastName: toCapitalize(this.lastName.value),
      mobile: this.mobile.value,
      email: this.email.value,
      password: this.password.value
    }

    return details;
  }
}

const phoneFormatter = (phone: string) => {
  const PHONE_REGX = /(^[1]?)[-.\s]?((\(\d{3}\)|\d{3}))[-.\s]?(\d{3})[-.\s]?(\d{4}$)/;
  return phone.replace(PHONE_REGX, '$1 ($2) $3-$4');
}

console.log(phoneFormatter('(829) 352-6198'));