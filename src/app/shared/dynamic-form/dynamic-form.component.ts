import { Component, OnInit, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormField } from './form-field.class';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FormField[] = [];
  @Input() enableValidCSS: boolean = true;
  @Input() disableSubmit: boolean = false;
  @Output('onSubmit') notifySubmit = new EventEmitter<FormGroup>();
  form: FormGroup;

  constructor(private ds: DynamicFormService) { }

  ngOnInit(): void {
    this.form = this.ds.createForm(this.fields);
    this.ds.enableValidCSS = this.enableValidCSS;
  }

  onSubmit(): void {
    this.notifySubmit.emit(this.form);
  }

}
