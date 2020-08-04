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
  isLoading: boolean = false;

  constructor(
    private us: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.initLoginForm();
    this.changeBodyProperties();
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
    const formData = new FormData();
    formData.append('username', this.username.value.trim());
    formData.append('password', this.password.value.trim());

    this.us.loginRequest(formData).subscribe();

    console.log(this.loginForm.value);
  }

  private changeBodyProperties(): void {
    document.body.style.overflow = 'hidden';
    document.body.style.background = '#fff';
  }

}
