import { Component, OnInit, OnChanges } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductVariant } from '../../models/product-variant.model';
import { VariantPanelService } from '../../services/variant-panel.service';

export interface VariantOption { 
  label: string; 
  variants?: ProductVariant[]; 
  optionValue?: string 
}

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
  showPanel: boolean = true;
  variantPanelLabel: string;

  dynamicVariantValue(index: number): string {
    return this.variantOptions[index].variants.find(val => {
      return val.variantId == this.hoveredVariant;
    }).optionValue;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private panelService: VariantPanelService
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
    if (this.variants && this.variants.length) {
      this.initVariants();
    }
  }

  private initVariants(): void {
    this.variantOptions = [
      { label: 'Configuration' },
      { label: 'Capacity' },
      { label: 'Color' },
      { label: 'Style' },
      { label: 'Model' },
      { label: 'Size' }
    ];

    this.variantOptions.map(option => {
      option.variants = 
      this.variants.filter(val => val.option == option.label);
    });
  }

  showAllOptions(variantOption: VariantOption): void {
    this.panelService.openVariantPanel({
      option: variantOption,
      activeVariant: this.activeVariant
    });
  }

  onOptionChange(productId: number): void {
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
