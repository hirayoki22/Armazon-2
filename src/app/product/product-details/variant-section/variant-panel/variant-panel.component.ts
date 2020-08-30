import { Component, AfterViewInit } from '@angular/core';
import { ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { VariantPanelService } from 'src/app/product/services/variant-panel.service';
import { VariantOption } from '../variant-section.component';
import { ProductService } from 'src/app/product/services/product.service';
import { map } from 'rxjs/operators';

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

  get priceDifference(): number {
    return 0;
  }

  constructor(
    private ps: ProductService,
    private panelService: VariantPanelService
  ) { }

  ngAfterViewInit(): void {
    this.panelService.$panelState.subscribe((data: PanelData) => {
      this.option = data.option;
      this.activeVariant = data.activeVariant;

      setTimeout(() =>this.scrollToOption(), 60);

      this.ps.getProductById(this.activeVariant).pipe(
        map(product => product.price)
      ).subscribe(price => console.log(price));
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
