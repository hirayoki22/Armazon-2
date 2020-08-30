import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'variant-panel',
  templateUrl: './variant-panel.component.html',
  styleUrls: ['./variant-panel.component.scss']
})
export class VariantPanelComponent implements OnInit {
  @Input() variantLabel: string;
  @Input() showPanel: boolean = false;
  @Output('showPanel') notifyChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.notifyChange.emit();
  }
}
