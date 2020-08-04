import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  loginForm: FormGroup;
  loginMessage: { loginSuccess: boolean, message: string };

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.initLoginForm();
  }

  initLoginForm(): FormGroup {
    return this.fb.group({
      username: [ null, Validators.required ],
      password: [ null, Validators.required ],
    });
  }

  get username(): string {
    return this.loginForm.get('username').value.trim();
  }

  get password(): string {
    return this.loginForm.get('password').value.trim();
  }

  onSubmit(): void {
    const URL = 'http://127.0.0.1/market-api/test.php';

    const formData = new FormData();
    formData.append('password', this.password);
    formData.append('username', this.username);
    
    fetch(URL, { method: 'POST', body: formData, credentials: 'omit'})
    .then(res => res.text())
    .then(res => console.log(res))
    // .then(res => this.loginMessage = res)
    .catch(err => err.getMessage);
  }
}
