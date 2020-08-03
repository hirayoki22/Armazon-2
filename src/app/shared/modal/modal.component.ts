import { Component, OnChanges } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges {
  @ViewChild('overlay') overlay: ElementRef<HTMLElement>;
  @ViewChild('modal') modal: ElementRef<HTMLElement>;
  @Input() width: string = '98vw';
  @Input() height: string = '96vh';
  @Input() showModal: boolean;
  @Output('showModal') notifyChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnChanges(): void {
    if (this.showModal) {
      document.body.classList.add('active-modal');

      fromEvent(window, 'keyup').subscribe((e: KeyboardEvent) => {
        if (e.key == 'Escape') { this.onClose(); }
      });
    } else {
      document.body.classList.remove('active-modal');
    }
  }

  onClose(): void {
    if (!this.overlay) { return; }

    const overlay = this.overlay.nativeElement;
    const modal = this.modal.nativeElement;

    modal.classList.add('hide');
    overlay.classList.add('hide');

    setTimeout(() => {
      document.body.classList.remove('active-modal');
      overlay.classList.remove('hide');
      modal.classList.remove('hide');

      this.showModal = false;
      this.notifyChange.emit(this.showModal);
    }, 200);
  }

  onClickOutside(e: MouseEvent): void {
    if (e.target == e.currentTarget) { this.onClose(); }
  }

}
