import { Component, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/product.service';

import { ProductVariant } from '../../product-variant.model';

@Component({
  selector: 'variant-section',
  templateUrl: './variant-section.component.html',
  styleUrls: ['./variant-section.component.scss']
})
export class VariantSectionComponent implements OnChanges {
  @Input() variants: ProductVariant[];
  colorVariants: ProductVariant[] = [];
  sizeVariants: ProductVariant[] = [];
  styleVariants: ProductVariant[] = [];
  modelVariants: ProductVariant[] = [];
  configurationVariants: ProductVariant[] = [];
  capacityVariants: ProductVariant[] = [];

  constructor() { }

  ngOnChanges(): void {
    if (this.variants.length) {
      this.colorVariants = this.variants.filter(val => val.option == 'Color');
      this.sizeVariants  = this.variants.filter(val => val.option == 'Size');
      this.styleVariants = this.variants.filter(val => val.option == 'Style');
      this.modelVariants = this.variants.filter(val => val.option == 'Model');
      this.styleVariants = this.variants.filter(val => val.option == 'Configuration');
      this.modelVariants = this.variants.filter(val => val.option == 'Capacity');
    }
  }

}
