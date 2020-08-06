import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, LoginInfo, LoginState } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loginState: LoginState;
  showPassword: boolean = false;
  isLoading: boolean = false;

  get currentYear(): number {
    return new Date().getFullYear();
  }

  constructor(
    private us: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initLoginForm();
  }

  private initLoginForm(): FormGroup {
    return this.fb.group({
      username: [ null, Validators.required ],
      password: [ null, Validators.required ],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  private get login(): LoginInfo {
    return {
      username: this.username.value.toLowerCase().trim(),
      password: this.password.value.trim()
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) { return; }

    this.isLoading = true;
    this.us.loginRequest(this.login).subscribe(state => {
      if (!state.success) {
        this.loginState = state;
        this.password.setValue(null);
      } else {
        location.href = '/admin-page';
      }
      this.isLoading = false;
    });
  }

}
