import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ProductService } from '../product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductExistsGuard implements CanActivate {

  constructor(private ps: ProductService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    const productId = +next.paramMap.get('id');

    return this.ps.verifyProductExists(productId);
  }
  
}
