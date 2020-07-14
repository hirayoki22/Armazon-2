import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from 'src/app/product.service';
import { CustomValidators } from './validators';

interface Category { categoryId: number; category: string };

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[];

  constructor(
    private ps: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.productForm = this.initForm();

    this.ps.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  private initForm(): FormGroup {
    return this.fb.group({
      productName: [ '', Validators.required ],
      brand:       [ '', Validators.required ],
      price:       [ 1, [Validators.required, Validators.min(1)] ],
      categoryId:  [ 0, Validators.required ],
      productDesc: [ '', Validators.required ],
      totalStock:  [ 1, [Validators.required, Validators.min(1)]],      
      images:      [ null, CustomValidators.imageValidator ],
    });
  }

  private toFormData(form: FormGroup): FormData {
    const formData = new FormData();

    for (let key in form.controls) {
      formData.append(key, form.get(key).value);
    }
    return formData;
  }

  onSubmit(): void {
    console.log(this.productForm.get('categoryId').value);
  }

}
