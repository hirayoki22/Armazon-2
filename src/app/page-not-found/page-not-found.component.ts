import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { FormField } from '../shared/dynamic-form/form-field.class';
import { MyAsyncValidators } from '../shared/validators/async-validators.service';
import { OwnValidators } from '../shared/validators/sync-validators';

import { DynamicFormService } from '../shared/dynamic-form/dynamic-form.service';
import { ProductService } from '../product.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  fields: FormField[];
  categories: Category[] = [];
  badGenderChoice: boolean = false;

  constructor(
    private ps: ProductService,
    private ds: DynamicFormService,
    private asyncValidators: MyAsyncValidators
  ) { }

  ngOnInit(): void {
    this.fields = this.getfields();

    this.ps.getCategories().subscribe(val => {
      this.categories = val;
      this.fields[4].selectOptions = this.fields[4].formatedOptions(this.categories);
    });
  }

  onClick(): void {
    this.badGenderChoice = !this.badGenderChoice;
  }

  getfields(): FormField[] {
    return [
      new FormField({
        fieldType: 'input',
        fieldKey: 'password',
        fieldLabel: 'Password',
        fieldOrder: 4,
        inpuType: 'password',
        validators: {
          sync: [ 
            Validators.required, 
            OwnValidators.password, 
            Validators.minLength(5) 
          ]
        }
      }),
      new FormField({
        fieldType: 'input',
        fieldKey: 'firstName',
        fieldLabel: 'First name',
        fieldOrder: 1,
        validators: {
          sync: [ 
            Validators.required,
            Validators.pattern(/^[A-zÀ-ú\s]+$/)
          ]
        }
      }),
      new FormField({
        fieldType: 'input',
        fieldKey: 'email',
        fieldLabel: 'Email address/username',
        fieldOrder: 3,
        inpuType: 'email',
        validators: {
          sync: [ Validators.required, OwnValidators.email ],
          async: [ this.asyncValidators.emailValidator() ]
        }
      }),
      new FormField({
        fieldType: 'input',
        fieldKey: 'lastName',
        fieldLabel: 'Last name',
        fieldOrder: 2,
        validators: {
          sync: [ 
            Validators.required,
            Validators.pattern(/^[A-zÀ-ú\s]+$/)
          ]
        }
      }),
      new FormField({
        fieldType: 'dropdown',
        fieldKey: 'categoryId',
        fieldLabel: 'Category',
        fieldOrder: 5,
        validators: {
          sync: [ Validators.required ]
        },
        selectOptions: this.categories
      }),
      new FormField({
        fieldType: 'input',
        fieldKey: 'gender',
        fieldLabel: 'Gender',
        fieldOrder: 6,
        validators: {
          sync: [ 
            Validators.required
          ]
        },
        customFeedback: {
          condition: false,
          message: 'Invalid gender choice. Stop trying to be progre, bitch!'
        }
      })
    ];  
  }

  onSubmit(form: FormGroup): void {
    console.log(form.value);
  }
}
