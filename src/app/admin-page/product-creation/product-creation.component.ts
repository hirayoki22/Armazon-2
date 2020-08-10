import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OwnValidators } from '../../shared/validators/sync-validators';
import { MyAsyncValidators } from '../../shared/validators/async-validators.service';

import { ProductService } from 'src/app/product.service';
import { FormField } from 'src/app/shared/dynamic-form/form-field.class';
import { DynamicFormComponent } from 'src/app/shared/dynamic-form/dynamic-form.component';

interface Category { categoryId: number; category: string };
interface VariantOption { optionId: number; option: string };

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements OnInit {
  variantForm: FormGroup;
  fields: FormField[];

  variantOptions: VariantOption[];
  isVariant: boolean = false;
  isLoading: boolean = false;

  constructor(
    private ps: ProductService,
    private fb: FormBuilder,
    private asyncValidators: MyAsyncValidators
  ) { }

  ngOnInit(): void {
    this.fields = this.initFields();
    this.variantForm = this.initVariantForm();

    this.ps.getCategories().subscribe(categories => {
      this.fields[3].selectOptions = 
        this.fields[3].formatedOptions(categories);
    });

    this.ps.getVariantOptions().subscribe(options => {
      this.variantOptions = options;
    });
  }

  private initVariantForm(): FormGroup {
    return this.fb.group({ 
      productId: [ 
        null, 
        {
          validators: [Validators.required],
          asyncValidators: [this.asyncValidators.productValidator()],
          updateOn: 'blur'
        }
      ],
      optionId: [ null, Validators.required ],
      optionValue: [ null, Validators.required ] 
    });
  }

  onSubmit(form?: FormGroup): void {
    const images = <File[]>form.get('images').value;
    const formData = new FormData();

    formData.append('product', this.getSanitizedForm(form));    
    images.forEach(image => formData.append('images[]', image));
    this.isLoading = true;

    if (!this.isVariant) {
      this.ps.addProducts(formData).subscribe(() => {
        form.reset();
        this.isLoading = false;
      });
    } else {
      this.ps.addProductVariant(formData).subscribe(() => {
        form.reset();
        this.variantForm.reset();
        this.isLoading = false;
        this.isVariant = false;
      });
    }
  }

  private getSanitizedForm(form: FormGroup): string {
    let productName = form.get('productName').value.trim();
    let productDesc = form.get('productDesc').value.trim();
    let brand = form.get('brand').value.trim();

    form.get('productName').setValue(productName);
    form.get('productDesc').setValue(productDesc);
    form.get('variantInfo').setValue(this.variantForm.value);
    form.get('brand').setValue(brand);     

    return JSON.stringify(form.value);
  }

  private initFields(): FormField[] {
    return [
      new FormField({
        fieldKey: 'productName',
        fieldLabel: 'Product name',
        fieldOrder: 1,
        validators: {
          sync: [ Validators.required ]
        }
      }),
      new FormField({
        fieldKey: 'brand',
        fieldLabel: 'Brand',
        fieldOrder: 2,
        validators: {
          sync: [ Validators.required ]
        }
      }),
      new FormField({
        fieldKey: 'price',
        fieldLabel: 'Listed price',
        fieldOrder: 3,
        inpuType: 'number',
        value: 1,
        validators: {
          sync: [ 
            Validators.required,
            Validators.min(1)
          ]
        }
      }),
      new FormField({
        fieldType: 'dropdown',
        fieldKey: 'categoryId',
        fieldLabel: 'Category',
        fieldOrder: 4,
        validators: {
          sync: [ Validators.required ]
        }
      }),
      new FormField({
        fieldKey: 'totalStock',
        fieldLabel: 'Total in stock',
        fieldOrder: 5,
        inpuType: 'number',
        value: 1,
        validators: {
          sync: [ 
            Validators.required,
            Validators.min(1)
          ]
        }
      }),
      new FormField({
        fieldType: 'textarea',
        fieldKey: 'productDesc',
        fieldLabel: 'Description',
        fieldOrder: 6,
        validators: {
          sync: [ Validators.required ]
        }
      }),
      new FormField({
        fieldType: 'none',
        fieldKey: 'images',
        fieldOrder: 7,
        validators: {
          sync: [ 
            Validators.required,
            OwnValidators.image
          ]
        }
      }),
      new FormField({
        fieldType: 'none',
        fieldKey: 'variantInfo',
        fieldOrder: 8
      })
    ];
  }
}
