import { Component, OnChanges } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'aside-panel',
  templateUrl: './aside-panel.component.html',
  styleUrls: ['./aside-panel.component.scss']
})
export class AsidePanelComponent implements OnChanges {
  @ViewChild('overlay') overlay: ElementRef<HTMLElement>;
  @ViewChild('panel') panel: ElementRef<HTMLElement>;
  @Input() showPanel: boolean;
  @Output('showPanel') notifyChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnChanges(): void {
    if (this.showPanel) {
      document.body.classList.add('active-overlay');

      window.onkeyup = (e: KeyboardEvent) => {
        if (e.key == 'Escape') { this.onClose(); }
      }
    } else {
      document.body.classList.remove('active-overlay');
    }
  }

  onClose(): void {
    const overlay = this.overlay.nativeElement;
    const panel = this.panel.nativeElement;

    panel.classList.add('slide-out');
    overlay.classList.add('hide');
    window.onkeyup = null;

    setTimeout(() => {
      document.body.classList.remove('active-overlay');
      overlay.classList.remove('hide');
      panel.classList.remove('slide-out');

      this.showPanel = false;
      this.notifyChange.emit(this.showPanel);
    }, 200);
  }

  onClickOutside(e: MouseEvent): void {
    if (e.target == e.currentTarget) { this.onClose(); }
  }

}
