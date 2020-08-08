import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-feedback',
  templateUrl: './input-feedback.component.html',
  styleUrls: [
    './input-feedback.component.scss',
    '../dynamic-form.component.scss'
  ]
})
export class InputFeedbackComponent implements OnInit {
  @Input() control: FormControl;
  @Input() fieldLabel: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.control);
  }

}
