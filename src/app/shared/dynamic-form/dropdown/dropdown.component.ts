import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormField } from '../form-field.class';
import { DynamicFormService } from '../dynamic-form.service';

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
  @Input() enableValidCSS: boolean;
 
  get control() { return this.form.get(this.field.fieldKey); }

  constructor(private ds: DynamicFormService) { }

  ngOnInit(): void {
  }
  
}
