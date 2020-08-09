import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormField } from '../form-field.class';

interface Feedback { condition: boolean, message: string };

@Component({
  selector: 'input-feedback',
  templateUrl: './input-feedback.component.html',
  styleUrls: ['./input-feedback.component.scss']
})
export class InputFeedbackComponent implements OnInit {
  @Input() control: FormControl;
  @Input() field: FormField;

  get label(): string {
    return this.field?.fieldLabel.toLowerCase();
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
