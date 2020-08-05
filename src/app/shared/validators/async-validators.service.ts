import { AsyncValidatorFn, AbstractControl, ValidationErrors,  } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class MyAsyncValidators {
  constructor(private ps: ProductService) { }

  public productValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const productId = +control.value;

      return this.ps.getProductById(productId).pipe(
        distinctUntilChanged(),        
        map(product => {
          return !product ? { notFound: true } : null;
        })
      );
    }
  } 
}