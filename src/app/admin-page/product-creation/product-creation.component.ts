import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

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
  isVariant: boolean = false;
  isLoading: boolean = false;

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
      categoryId:  [ null, Validators.required ],
      productDesc: [ '', Validators.required ],
      totalStock:  [ 1, [Validators.required, Validators.min(1)]],      
      images:      [ [], CustomValidators.imageValidator ],
      variantInfo: this.fb.array([ this.variantForm() ])
    });
  }

  private variantForm(): FormGroup {
    return this.fb.group({ 
      originalProductId: [ null, Validators.required ],
      optionId:          [ null, Validators.required ],
      optionValue:       [ null, Validators.required ] 
    });
  }

  get variantInfo(): FormArray {
    return <FormArray>this.productForm.get('variantInfo');
  }

  onSubmit(): void {
    const images = <File[]>this.productForm.get('images').value;
    const formData = new FormData();

    formData.append('product', this.getSanitizedForm());    
    images.forEach(image => formData.append('images[]', image));

    this.isLoading = true;
    if (!this.isVariant) {
      this.ps.addProducts(formData).subscribe(() => {
        this.productForm.reset();
        this.isLoading = false;
      });
    } else {
      this.ps.addProductVariant(formData).subscribe(() => {
        this.productForm.reset();
        this.isLoading = false;
        this.isVariant = false;
      });
    }
  }

  private getSanitizedForm(): string {
    let productName = this.productForm.get('productName').value.trim();
    let productDesc = this.productForm.get('productDesc').value.trim();
    let brand = this.productForm.get('brand').value.trim();

    this.productForm.get('productName').setValue(productName);
    this.productForm.get('productDesc').setValue(productDesc);
    this.productForm.get('brand').setValue(brand);

    return JSON.stringify(this.productForm.value);
  }

}
