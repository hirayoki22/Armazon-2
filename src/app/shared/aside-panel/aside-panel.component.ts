import { Component, OnInit } from '@angular/core';
import { ViewChild, ViewChildren, ContentChild, ContentChildren, ElementRef, QueryList } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'aside-panel',
  templateUrl: './aside-panel.component.html',
  styleUrls: ['./aside-panel.component.scss']
})
export class AsidePanelComponent implements OnInit {
  @Input() heading: string = '';
  @Input() showPanel: boolean;
  @Output('showPanel') notifyChange: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('active-overlay');

    window.onkeyup = (e: KeyboardEvent) => {
      if (e.key == 'Escape') { this.onClose(); }
    }
  }

  onClose(): void {
    const overlay = document.querySelector('.overlay');
    const section = document.querySelector('.panel');

    section.classList.add('slide-out');
    overlay.classList.add('hide');
    window.onkeyup = null;

    setTimeout(() => {
      document.body.classList.remove('active-overlay');
      overlay.classList.remove('hide');
      section.classList.remove('slide-out');
      this.showPanel = false;
      this.notifyChange.emit(this.showPanel);
    }, 400);
  }

  overlayClick(e: MouseEvent): void {
    if (e.target == e.currentTarget) { this.onClose(); }
  }

}
