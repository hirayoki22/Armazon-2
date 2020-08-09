import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../form-field.class';
import { SpecialFeedback } from '../dynamic-form.component';

@Component({
  selector: 'dynamic-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: [
    './dropdown.component.scss',
    '../dynamic-form.component.scss'
  ]
})
export class DropdownComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() field: FormField;
  @Input() specialFeedback: SpecialFeedback;
 
  get control() { return this.form.get(this.field.fieldKey); }

  constructor() { }

  ngOnInit(): void {
  }
  
}
