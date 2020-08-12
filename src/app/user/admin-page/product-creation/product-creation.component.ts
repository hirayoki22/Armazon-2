import { Component, OnInit, ViewChild } from '@angular/core';
import { VariantFormComponent } from './variant-form/variant-form.component';
import { FormGroup, Validators } from '@angular/forms';
import { OwnValidators } from '../../../shared/validators/sync-validators';

import { ProductService } from 'src/app/product/services/product.service';
import { FormField } from 'src/app/shared/dynamic-form/form-field.class';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements OnInit {
  @ViewChild(VariantFormComponent) variantForm: VariantFormComponent;
  fields: FormField[];
  isVariant: boolean = false;
  isLoading: boolean = false;

  constructor(private ps: ProductService) { }

  ngOnInit(): void {
    this.fields = this.initFields();

    this.ps.getCategories().subscribe(categories => {
      this.fields[3].selectOptions = 
        this.fields[3].formatedOptions(categories);
    });
  }

  onSubmit(form: FormGroup): void {
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
        this.isVariant = false;
        this.isLoading = false;
      });
    }
  }

  private getSanitizedForm(form: FormGroup): string {
    let productName = form.get('productName').value.trim();
    let productDesc = form.get('productDesc').value.trim();
    let brand = form.get('brand').value.trim();

    form.get('productName').setValue(productName);
    form.get('productDesc').setValue(productDesc);
    form.get('brand').setValue(brand);     

    if (this.isVariant) {
      form.get('variantInfo').setValue(this.variantForm.form.value);
    }

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
