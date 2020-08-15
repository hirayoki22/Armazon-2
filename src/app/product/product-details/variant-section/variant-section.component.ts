import { Component, OnInit, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductVariant } from '../../models/product-variant.model';

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
  hoveredVariant: number = 0;

  get variantValue(): string {
    return this.variants.find(val => {
      return val.variantId == this.hoveredVariant;
    }).optionValue;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const originalId = +this.route.snapshot.paramMap.get('id');
      const variantId = +params.get('variantId');

      this.activeVariant = variantId || originalId;
      this.hoveredVariant = this.activeVariant;
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

  onChange(productId: number): void {
    this.router.navigate(
      [],
      { 
        relativeTo: this.route,
        queryParams: { variantId: productId },
        queryParamsHandling: 'merge',
      }
    );
  }

}
