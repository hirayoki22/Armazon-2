import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { UserAuthGuard } from './user-auth.guard';
import { UserPanelComponent } from './user-panel/user-panel.component';

const routes: Routes = [
  { 
    path: '', 
    component: UserComponent,
    children: [
      { 
        path: 'login',  
        component: LoginPageComponent,
        canActivate: [ UserAuthGuard ]  
      },
      {
        path: 'signup', 
        component: SignupPageComponent,
        canActivate: [ UserAuthGuard ]
      },
      { 
        path: 'panel', 
        component: UserPanelComponent ,
        canActivate: [ UserAuthGuard ]  
      },
      { path: '', redirectTo: 'login' }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
