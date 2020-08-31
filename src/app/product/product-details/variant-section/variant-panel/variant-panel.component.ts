import { Component, AfterViewInit } from '@angular/core';
import { ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { VariantPanelService } from 'src/app/product/services/variant-panel.service';
import { VariantOption } from '../variant-section.component';

interface PanelData { option: VariantOption, activeVariant: number }

@Component({
  selector: 'variant-panel',
  templateUrl: './variant-panel.component.html',
  styleUrls: ['./variant-panel.component.scss']
})
export class VariantPanelComponent implements AfterViewInit {
  @ViewChildren('optionBtn') optionBtns: QueryList<ElementRef<HTMLElement>>; 
  @Output('onOptionChange') notifyChange = new EventEmitter<number>();
  option: VariantOption;
  activeVariant: number = 0;

  getPriceDiff(price: number): string {
    const currPrice = this.option.variants.find(val => {
      return val.variantId == this.activeVariant;
    }).price;
    const priceDiff = 
      Math.round(((currPrice - price) + Number.EPSILON) * 100) / 100;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    console.log(currPrice - price);

    return (priceDiff == 0) ? '' : (priceDiff < 0) ? 
    `+ ${formatter.format(Math.abs(priceDiff))}` : 
    `- ${formatter.format(Math.abs(priceDiff))}`;
  }

  constructor(private panelService: VariantPanelService) { }

  ngAfterViewInit(): void {
    this.panelService.$panelState.subscribe((data: PanelData) => {
      this.option = data.option;
      this.activeVariant = data.activeVariant;

      setTimeout(() =>this.scrollToOption());
    });
  }

  private scrollToOption(): void {
    const optionBtns = this.optionBtns.toArray()
    .map(option => option.nativeElement);

    const index = this.option.variants.findIndex(variant => {
      return variant.variantId == this.activeVariant;
    });

    optionBtns[index]?.scrollIntoView({ block: 'center' });
  }

  onOptionClick(variantId: number): void {
    this.notifyChange.emit(variantId);
    this.onClose();
  }

  onClose(): void {
    this.option = null;
  }
}
