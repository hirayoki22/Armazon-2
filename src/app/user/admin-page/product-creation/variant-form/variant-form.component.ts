import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { MyAsyncValidators } from 'src/app/shared/validators/async-validators.service';

import { ProductService } from 'src/app/product/services/product.service';

interface VariantOption { optionId: number; option: string };
interface VariantField { 
  key: string, 
  label: string, 
  fieldType?: 'input' | 'dropdown',
  inputType?: string
};

@Component({
  selector: 'variant-form',
  templateUrl: './variant-form.component.html',
  styleUrls: [
    './variant-form.component.scss',
    '../../../../shared/dynamic-form/dynamic-form.component.scss',
    '../../../../shared/dynamic-form/input-feedback/input-feedback.component.scss',
  ]
})
export class VariantFormComponent implements OnInit {
  form: FormGroup;
  variantOptions: VariantOption[];

  fields: VariantField[] = [
    { 
      key: 'optionId', 
      label: 'Option', 
      fieldType: 'dropdown' 
    },
    { 
      key: 'productId', 
      label: 'Original product ID', 
      inputType: 'number' 
    },
    { 
      key: 'optionValue', 
      label: 'Option value/label' 
    }
  ];

  control(key: string): AbstractControl { return this.form.get(key); }

  constructor(
    private ps: ProductService,
    private fb: FormBuilder,
    private asyncValidators: MyAsyncValidators
  ) { }

  ngOnInit(): void {
    this.ps.getVariantOptions().subscribe(options => {
      this.variantOptions = options;
      this.form = this.initform();
    });
  }

  private initform(): FormGroup {
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

}
