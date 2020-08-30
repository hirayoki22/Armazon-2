import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { VariantPanelService } from 'src/app/product/services/variant-panel.service';
import { VariantOption } from '../variant-section.component';

@Component({
  selector: 'variant-panel',
  templateUrl: './variant-panel.component.html',
  styleUrls: ['./variant-panel.component.scss']
})
export class VariantPanelComponent implements OnInit {
  option: VariantOption;
  showPanel: boolean = false;
  activeVariant: number = 0;

  constructor(private panelService: VariantPanelService) { }

  ngOnInit(): void {
    this.panelService.$panelState.subscribe((option: VariantOption) => {
      this.showPanel = true;
      this.option = option;
    });
  }

  onClose(): void {
    this.showPanel = false;
    this.option = null;
  }
}
