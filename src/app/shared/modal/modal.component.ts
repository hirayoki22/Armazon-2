import { Component, OnChanges } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

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
      document.body.classList.add('active-overlay');

      // window.onkeyup = (e: KeyboardEvent) => {
      //   if (e.key == 'Escape') { this.onClose(); }
      // }
    } else {
      document.body.classList.remove('active-overlay');
    }
  }

  onEscapeKey(e: KeyboardEvent): void {
    console.log(e.key);
  };

  onClose(): void {
    const overlay = this.overlay.nativeElement;
    const modal = this.modal.nativeElement;

    modal.classList.add('zoom-out');
    overlay.classList.add('hide');
    // window.onkeyup = null;

    setTimeout(() => {
      document.body.classList.remove('active-overlay');
      overlay.classList.remove('hide');
      modal.classList.remove('zoom-out');

      this.showModal = false;
      this.notifyChange.emit(this.showModal);
    }, 200);
  }

  onClickOutside(e: MouseEvent): void {
    if (e.target == e.currentTarget) { this.onClose(); }
  }

}
