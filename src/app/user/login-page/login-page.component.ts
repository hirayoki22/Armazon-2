import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { UserService, LoginInfo, LoginState } from '../user.service';
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

    this.isLoading = true;
    this.us.loginRequest(login).subscribe(state => {
      if (!state.success) {
        if (state.error.username) {
          this.setCustomFeedback(state, 0);
          username.setErrors({invalid: true});
        } else {
          this.setCustomFeedback(state, 1);
          username.setErrors(null);
          password.setErrors({invalid: true});
          password.setValue(null);
        }
      } else {
        this.router.navigate(['/']);
      }
      this.isLoading = false;
    });
  }

  private setCustomFeedback(state: LoginState, index: number) {
    this.fields[index].customFeedback = {
      condition: true,
      message: state.message
    }
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
