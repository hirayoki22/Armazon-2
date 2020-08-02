import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ReviewFormService } from './review-form.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';

interface QuickInfo { productName: string; image: string; }

@Component({
  selector: 'review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {
  product: QuickInfo;
  reviewForm: FormGroup;
  showForm: boolean = false;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private ps: ProductService,
    private rf: ReviewFormService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.rf.$formState.subscribe(() => {
      this.reviewForm = this.initiReviewForm();
      this.showForm = true;

      this.getProduct();
    });
  }

  getProduct(): void {
    const productId = +this.route.snapshot.paramMap.get('id');
    
    console.log(productId);
    this.route.paramMap.subscribe(params => {
      console.log(params);
    });
  }

  private initiReviewForm(): FormGroup {
    return this.fb.group({
      overallRating: [ 0, Validators.required ],
      headline: [ null ],
      review: [ null, Validators.required ]
    });
  }

  onSubmit(): void {
    console.log(this.reviewForm.value);
  }

  onClose(): void {
    this.showForm = false;
  }
}
