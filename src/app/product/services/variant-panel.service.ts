import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariantPanelService {
  private panelStateSource = new Subject<{}>();
  $panelState = this.panelStateSource.asObservable();

  constructor() { }

  openVariantPanel(data: {}): void {
    this.panelStateSource.next(data);
  }
}
