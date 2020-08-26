import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors,  } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay, distinctUntilChanged } from 'rxjs/operators';

import { ProductService } from 'src/app/product/services/product.service';
import { UserService } from 'src/app/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MyAsyncValidators {
  constructor(
    private ps: ProductService,
    private us: UserService
  ) { }

  public productValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const productId = +control.value;

      return this.ps.getProductById(productId).pipe(
        delay(300),
        distinctUntilChanged(),      
        map(product => {
          return !product ? { notFound: true } : null;
        })
      );
    }
  } 

  public emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.us.verifyEmailExists(control.value).pipe(
        delay(300),
        distinctUntilChanged(),        
        map(state => {
          return state.exists ? { exists: true } : null;
        })
      );
    }
  }
}