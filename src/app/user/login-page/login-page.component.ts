import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { UserService, LoginInfo } from '../user.service';
import { FormField } from 'src/app/shared/dynamic-form/form-field.class';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  fields: FormField[];
  isLoading: boolean = false;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  constructor(
    private router: Router,
    private us: UserService,
  ) { }

  ngOnInit(): void {
    this.fields = this.getFields();
  }

  onSubmit(form: FormGroup): void {
    if (form.invalid) { return; }

    const username = form.get('username');
    const password = form.get('password');
    const login: LoginInfo = {
      username: username.value.trim(),
      password: password.value
    }

    // console.log(login);

    this.isLoading = true;
    this.us.loginRequest(login).subscribe(state => {
      if (!state.success) {
        if (state.error.password) {
          password.reset();
          password.setErrors({invalid: true});
        } else {
          username.setErrors({invalid: true});
        }
      } else {
        this.router.navigate(['/']);
      }
      this.isLoading = false;
    });
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
