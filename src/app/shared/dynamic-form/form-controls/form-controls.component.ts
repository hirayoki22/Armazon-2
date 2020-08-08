import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../form-field.class';

@Component({
  selector: 'form-control',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss']
})
export class FormControlsComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() fields: FormField[];

  constructor() { }

  ngOnInit(): void {
  }

  getControl(key: string) { return this.form.get(key); }
}
