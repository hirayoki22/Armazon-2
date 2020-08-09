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

  feedbacks: Feedback[];
  
  constructor() { }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(() => {
      console.log(Object.keys(this.control.errors)[0]);
      // this.feedbacks = this.initFeedbacks();
    });
  }

  initFeedbacks(): Feedback[] {
    return [
      { 
        condition: this.control?.errors.required,
        message: `Enter your ${this.label}`
      },
      { 
        condition: this.control?.errors.pattern,
        message: `Invalid ${this.label} format`
      },
      { 
        condition: this.control?.errors.minlength,
        message: `Cannot be less than 
        ${this.control?.errors?.minlength?.requiredLength} characters`
      },
      { 
        condition: this.control?.errors.exists,
        message: `This ${this.label} is already in use`
      },
      { 
        condition: this.control?.value && this.control?.errors?.password,
        message: `This ${this.label} is not secure`
      },
      // { 
      //   condition: this.control.dirty && this.field?.customFeedback?.condition,
      //   message: this.field?.customFeedback?.message
      // }
    ];
  }
}
