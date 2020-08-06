import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private us: UserService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const url = state.url;

    return this.us.isLoggedin.pipe(
      map(state => {
        if (url === '/user/account') {
          if (state) {
            return true;
          } else {
            this.router.navigate(['/user/login']);          
            return false;
          }
        } else {
          if (state) {
            this.router.navigate(['/']);
            return false;
          } else {
            return true;
          }
        }
      })
    );
  }
  
}
