import { Component, OnChanges } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'aside-panel',
  templateUrl: './aside-panel.component.html',
  styleUrls: ['./aside-panel.component.scss']
})
export class AsidePanelComponent implements OnChanges {
  @ViewChild('overlay') overlay: ElementRef<HTMLElement>;
  @ViewChild('panel') panel: ElementRef<HTMLElement>;
  @Input() showPanel: boolean;
  @Input() title: string;
  @Output('showPanel') notifyChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnChanges(): void {
    if (this.showPanel) {
      document.body.classList.add('active-sidepanel');

      fromEvent(window, 'keyup').subscribe((e: KeyboardEvent) => {
        if (e.key == 'Escape') { this.onClose(); }
      });
    } else {
      document.body.classList.remove('active-sidepanel');
    }
  }

  onClose(): void {
    if (!this.overlay) { return; }
    
    const overlay = this.overlay.nativeElement;
    const panel = this.panel.nativeElement;

    panel.classList.add('slide-out');
    overlay.classList.add('hide');
    window.onkeyup = null;

    setTimeout(() => {
      document.body.classList.remove('active-sidepanel');
      overlay.classList.remove('hide');
      panel.classList.remove('slide-out');

      this.showPanel = false;
      this.notifyChange.emit(this.showPanel);
    }, 300);
  }

  onClickOutside(e: MouseEvent): void {
    if (e.target == e.currentTarget) { this.onClose(); }
  }

}
