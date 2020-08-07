import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OwnValidators } from '../../shared/validators/sync-validators';
import { MyAsyncValidators } from '../../shared/validators/async-validators.service';

import { ProductService } from 'src/app/product.service';

interface Category { categoryId: number; category: string };
interface VariantOption { optionId: number; option: string };

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements OnInit {
  productForm: FormGroup;
  variantForm: FormGroup;
  categories: Category[];
  variantOptions: VariantOption[];
  isVariant: boolean = false;
  isLoading: boolean = false;

  constructor(
    private ps: ProductService,
    private fb: FormBuilder,
    private productValidator: MyAsyncValidators
  ) { }

  ngOnInit(): void {
    this.productForm = this.initForm();
    this.variantForm = this.initVariantForm();

    this.ps.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.ps.getVariantOptions().subscribe(options => {
      this.variantOptions = options;
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
      images:      [ [], OwnValidators.imageValidator ],
      variantInfo: null
    });
  }

  private initVariantForm(): FormGroup {
    return this.fb.group({ 
      originalProductId: [ 
        null, 
        {
          validators: [Validators.required],
          asyncValidators: [this.productValidator.productValidator()],
          updateOn: 'blur'
        }
      ],
      optionId: [ null, Validators.required ],
      optionValue: [ null, Validators.required ] 
    });
  }

  get originalProductId(): FormControl {
    return <FormControl>this.variantForm.get('originalProductId');
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
        this.variantForm.reset();
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
    this.productForm.get('variantInfo').setValue(this.variantForm.value);
    this.productForm.get('brand').setValue(brand);     

    return JSON.stringify(this.productForm.value);
  }

}
