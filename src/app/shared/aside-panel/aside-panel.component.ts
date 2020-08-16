import { Component, OnChanges } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'aside-panel',
  templateUrl: './aside-panel.component.html',
  styleUrls: ['./aside-panel.component.scss']
})
export class AsidePanelComponent implements OnChanges {
  @Input() showPanel: boolean;
  @Output('showPanel') notifyChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnChanges(): void {
    if (this.showPanel) {
      document.body.classList.add('active-sidepanel');

      fromEvent(window, 'keyup').subscribe((e: KeyboardEvent) => {
        if (e.key == 'Escape') { this.onClose(); }
      });
    } else {
      this.onClose();
    }
  }

  onClose(): void {
    document.body.classList.remove('active-sidepanel');
    this.notifyChange.emit(this.showPanel = false);
  }

  onClickOutside(e: MouseEvent): void {
    if (e.target == e.currentTarget) { this.onClose(); }
  }

}
