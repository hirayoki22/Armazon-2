import { Component, OnInit } from '@angular/core';

import { VariantPanelService } from 'src/app/product/services/variant-panel.service';
import { VariantOption } from '../variant-section.component';

@Component({
  selector: 'variant-panel',
  templateUrl: './variant-panel.component.html',
  styleUrls: ['./variant-panel.component.scss']
})
export class VariantPanelComponent implements OnInit {
  variantOption: VariantOption;
  showPanel: boolean = false;

  constructor(private panelService: VariantPanelService) { }

  ngOnInit(): void {
    this.panelService.$panelState.subscribe(option => {
      console.log(option);
    });
  }

  onClose(): void {
    this.showPanel = false;

  }
}
