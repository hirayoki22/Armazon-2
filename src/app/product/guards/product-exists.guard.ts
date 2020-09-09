import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductExistsGuard implements CanActivate {

  constructor(
    private router: Router,
    private ps: ProductService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const productId = +next.paramMap.get('id');

    return this.ps.productExists(productId).pipe(
      tap(exists => {
        if (!exists) {          
          this.router.navigate(['/404']);
        }
      })
    );
  }
  
}
