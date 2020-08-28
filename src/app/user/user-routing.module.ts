import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserAuthGuard } from './guards/user-auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { 
        path: 'login',  
        component: LoginPageComponent,
        canActivate: [ UserAuthGuard ],
        data: { title: 'Login Page' }  
      },
      {
        path: 'signup', 
        component: SignupPageComponent,
        canActivate: [ UserAuthGuard ],
        data: { title: 'Signup Page' }  
      },
      { 
        path: 'account', 
        component: UserAccountComponent ,
        canActivate: [ UserAuthGuard ],
        data: { title: 'User Account' }  
      },
      { 
        path: 'admin-page', 
        loadChildren: () => import('./admin-page/admin-page.module').then(m => m.AdminPageModule)
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
