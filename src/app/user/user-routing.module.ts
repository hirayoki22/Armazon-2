import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: UserComponent,
    children: [
      { path: 'login',  component: LoginPageComponent  },
      { path: 'signup', component: SignupPageComponent },
      { path: '', redirectTo: 'login' }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
