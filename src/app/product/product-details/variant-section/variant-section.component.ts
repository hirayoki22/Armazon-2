import { Component, OnInit, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductVariant } from '../../models/product-variant.model';

interface VariantOption { label: string; variants: ProductVariant[] }

@Component({
  selector: 'variant-section',
  templateUrl: './variant-section.component.html',
  styleUrls: ['./variant-section.component.scss']
})
export class VariantSectionComponent implements OnInit, OnChanges {
  @Input() variants: ProductVariant[];
  variantOptions: VariantOption[];
  activeVariant: number = 0;
  hoveredVariant: number = 0;

  dynamicVariantValue(index: 0): string {
    return this.variantOptions[index].variants.find(val => {
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

  private initVariants(): void {
    this.variantOptions = [
      { label: 'Configuration', variants: [] },
      { label: 'Capacity',      variants: [] },
      { label: 'Color',         variants: [] },
      { label: 'Style',         variants: [] },
      { label: 'Model',         variants: [] },
      { label: 'Size',          variants: [] }
    ];

    this.variantOptions.map(option => {
      option.variants = 
      this.variants.filter(val => val.option == option.label);
    });
  }

  ngOnChanges(): void {
    if (this.variants.length) {
      this.initVariants();
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
