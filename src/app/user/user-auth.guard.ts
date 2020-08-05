import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private us: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const url = state.url;

    return this.us.isLoggedin.pipe(
      map(state => {
        if (url.includes('user/panel')) {
          if (state) {
            return true;
          } else {
            location.href = '/';
            return false;
          }
        } else {
          if (state) {
            location.href = '/';
            return false;
          } else {
            return true;
          }
        }
      })
    );
  }
  
}
