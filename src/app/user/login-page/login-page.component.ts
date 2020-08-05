import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  invalidLogin: boolean = false;
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

  onSubmit(): void {
    if (this.loginForm.invalid) { return; }

    const formData = new FormData();
    formData.append('username', this.username.value.trim());
    formData.append('password', this.password.value.trim());

    this.isLoading = true;
    this.us.loginRequest(formData).subscribe(res => {
      if (!res.success) {
        this.invalidLogin = true;
        this.password.setValue(null);
      } else {
        location.href = '/admin-page';
      }
      this.isLoading = false;
    });
  }

}
