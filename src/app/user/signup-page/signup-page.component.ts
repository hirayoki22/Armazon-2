import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { OwnValidators } from '../own-validators';

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
      mobile:     [ null, [ Validators.required,  ] ],
      email:      [ null, [ Validators.required,  ] ],
      password:   [ null, [ Validators.required,  ] ],
      rePassword: [ null, [ Validators.required,  ] ],
    },
    {
      // validators: OwnValidators.passwordMatch
    });
  }

  get firstName()  { return this.signupForm.get('firstName'); }
  get lastName()   { return this.signupForm.get('lastName'); }
  get mobile()     { return this.signupForm.get('mobile'); }
  get email()      { return this.signupForm.get('email'); }
  get password()   { return this.signupForm.get('password'); }
  get rePassword() { return this.signupForm.get('rePassword'); }

  onSubmit(): void {
    if (this.signupForm.invalid) { return; }

    console.log(this.signupForm.value);
  }

}
