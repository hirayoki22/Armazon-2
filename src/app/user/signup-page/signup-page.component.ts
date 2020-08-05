import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwnValidators } from '../own-validators';

import { UserService } from '../user.service';

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
    private us: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.signupForm = this.initLoginForm();

  }

  private initLoginForm(): FormGroup {
    return this.fb.group({
      firstName:  [ null, [ Validators.required, Validators.pattern(/^[A-zÀ-ú\s]+$/) ] ],
      lastName:   [ null, [ Validators.required, Validators.pattern(/^[A-zÀ-ú\s]+$/) ] ],
      mobile:     [ null, [ Validators.required, OwnValidators.mobile] ],
      email:      [ null, [ Validators.required, OwnValidators.email ] ],
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
    console.log(this.password.errors);
    console.log(this.signupForm.errors);
  }

}
