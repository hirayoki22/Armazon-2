import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, LoginInfo, LoginState } from '../user.service';
import { FormField } from 'src/app/shared/dynamic-form/form-field.class';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  fields: FormField[];
  loginForm: FormGroup;
  loginState: LoginState;
  showPassword: boolean = false;
  isLoading: boolean = false;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  constructor(
    private router: Router,
    private us: UserService,
    // private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.loginForm = this.initLoginForm();
    this.fields = this.getFields();
  }

  // private initLoginForm(): FormGroup {
  //   return this.fb.group({
  //     username: [ null, Validators.required ],
  //     password: [ null, Validators.required ],
  //   });
  // }

  // get username() {
  //   return this.loginForm.get('username');
  // }

  // get password() {
  //   return this.loginForm.get('password');
  // }

  // private get login(): LoginInfo {
  //   return {
  //     username: this.username.value.toLowerCase().trim(),
  //     password: this.password.value.trim()
  //   }
  // }

  onSubmit(form: FormGroup): void {
    if (form.invalid) { return; }

    console.log(form.value);

    // this.isLoading = true;
    // this.us.loginRequest(this.login).subscribe(state => {
    //   if (!state.success) {
    //     this.loginState = state;
    //     this.password.setValue(null);
    //   } else {
    //     this.router.navigate(['/']);
    //   }
    //   this.isLoading = false;
    // });
  }

  getFields(): FormField[] {
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
