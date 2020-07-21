import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from 'src/app/product.service';
import { ProductVariant } from '../../product-variant.model';

@Component({
  selector: 'variant-section',
  templateUrl: './variant-section.component.html',
  styleUrls: ['./variant-section.component.scss']
})
export class VariantSectionComponent implements OnInit, OnChanges {
  @Input() variants: ProductVariant[];
  colorVariants: ProductVariant[] = [];
  sizeVariants: ProductVariant[] = [];
  styleVariants: ProductVariant[] = [];
  modelVariants: ProductVariant[] = [];
  configurationVariants: ProductVariant[] = [];
  capacityVariants: ProductVariant[] = [];

  activeVariant: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.activeVariant = +params.get('id');
    });
  }

  ngOnChanges(): void {
    if (this.variants.length) {
      this.colorVariants = this.variants.filter(val => val.option == 'Color');
      this.sizeVariants  = this.variants.filter(val => val.option == 'Size');
      this.styleVariants = this.variants.filter(val => val.option == 'Style');
      this.modelVariants = this.variants.filter(val => val.option == 'Model');
      this.configurationVariants = this.variants.filter(val => val.option == 'Configuration');
      this.capacityVariants = this.variants.filter(val => val.option == 'Capacity');
    }
  }

}
