import { Directive, ElementRef, AfterContentInit, Input } from '@angular/core';

@Directive({
  selector: '[autoFocus]'
})
export class InputAutofocusDirective implements AfterContentInit {
  @Input('autoFocus') shouldFocus: boolean = true;

  constructor(private ele: ElementRef) { }

  public ngAfterContentInit(): void {
    if (this.shouldFocus) {
      setTimeout(() => this.ele.nativeElement.focus());
    }
  }
}
