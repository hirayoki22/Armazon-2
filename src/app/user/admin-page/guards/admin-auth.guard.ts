import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private us: UserService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    
    return this.us.isAdmin.pipe(
      map(authInfo => {
        if (!authInfo.active) {
          this.router.navigate(['/user/login']);
          return false;
        } 
        else if (authInfo.role !== 'ADMIN') {
          this.router.navigate(['/user/account']);
          return false;
        }
        else if (authInfo.active && authInfo.role === 'ADMIN') {
          return true;
        }
      })
    );
  }
  
}
