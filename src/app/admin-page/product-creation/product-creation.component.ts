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
  fields: FormField[];
  variantFields: FormField[];

  variantOptions: VariantOption[];
  isVariant: boolean = false;
  isLoading: boolean = false;

  constructor(
    private ps: ProductService,
    private fb: FormBuilder,
    private asyncValidators: MyAsyncValidators
  ) { }

  ngOnInit(): void {
    this.fields = this.getFields();
    this.variantFields = this.getVariantFields();

    this.ps.getCategories().subscribe(categories => {
      this.fields[3].selectOptions = this.fields[3].formatedOptions(categories);
    });

    this.ps.getVariantOptions().subscribe(options => {
      this.variantOptions = options;
    });
  }


  

  onSubmit(form?: FormGroup): void {
    // const images = <File[]>this.productForm.get('images').value;
    // const formData = new FormData();

    // formData.append('product', this.getSanitizedForm());    
    // images.forEach(image => formData.append('images[]', image));
    // this.isLoading = true;

    // if (!this.isVariant) {
    //   this.ps.addProducts(formData).subscribe(() => {
    //     this.productForm.reset();
    //     this.isLoading = false;
    //   });
    // } else {
    //   this.ps.addProductVariant(formData).subscribe(() => {
    //     this.productForm.reset();
    //     this.variantForm.reset();
    //     this.isLoading = false;
    //     this.isVariant = false;
    //   });
    // }
    console.log(form.value);
  }

  // private getSanitizedForm(form?: FormGroup): string {
  //   let productName = this.productForm.get('productName').value.trim();
  //   let productDesc = this.productForm.get('productDesc').value.trim();
  //   let brand = this.productForm.get('brand').value.trim();

  //   this.productForm.get('productName').setValue(productName);
  //   this.productForm.get('productDesc').setValue(productDesc);
  //   this.productForm.get('variantInfo').setValue(this.variantForm.value);
  //   this.productForm.get('brand').setValue(brand);     

  //   return JSON.stringify(this.productForm.value);
  // }

  showVariantFields(input: HTMLInputElement): void {
    if (input.checked) {
      this.fields = this.variantFields;
    }
  }

  private getFields(): FormField[] {
    return [
      new FormField({
        fieldKey: 'productName',
        fieldLabel: 'Product',
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

  private getVariantFields(): FormField[] {
    return [
      new FormField({
        fieldKey: 'originalProductId',
        fieldLabel: 'Original Product ID',
        fieldOrder: 1,
        inpuType: 'number',
        validators: {
          sync: [ Validators.required ],
          async: [this.asyncValidators.productValidator()]
        }
      }),
      new FormField({
        fieldType: 'dropdown',
        fieldKey: 'optionId',
        fieldLabel: 'Option',
        fieldOrder: 2,
        validators: {
          sync: [ Validators.required ],
        }
      }),
      new FormField({
        fieldKey: 'optionValue',
        fieldLabel: 'Option value/name',
        fieldOrder: 3,
        validators: {
          sync: [ Validators.required ],
        }
      })
    ];
  }
}
