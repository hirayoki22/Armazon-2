import { Component, OnInit } from '@angular/core';
import { ReviewFormService } from './review-form.service';

@Component({
  selector: 'review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {
  showForm: boolean = false;
  isLoading: boolean = false;

  constructor(private rf: ReviewFormService) { }

  ngOnInit(): void {
    this.rf.$formState.subscribe(() => {
      this.showForm = true;
    });
  }

  onClose(): void {
    this.showForm = false;
  }
}
