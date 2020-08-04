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
  }

  initLoginForm(): FormGroup {
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

    console.log(this.loginForm.value);
  }

}
