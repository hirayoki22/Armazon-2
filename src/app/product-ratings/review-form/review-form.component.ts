import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ReviewFormService } from './review-form.service';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';

@Component({
  selector: 'review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {
  product: Product;
  reviewForm: FormGroup;
  showForm: boolean = false;
  isLoading: boolean = false;

  constructor(
    private ps: ProductService,
    private rf: ReviewFormService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.rf.$formState.subscribe(productId => {
      this.reviewForm = this.initiReviewForm();
      this.showForm = true;

      this.getProduct(productId);
    });
  }

  getProduct(productId: number): void {
    this.ps.getProductById(productId).subscribe(product => {
      this.product = product;
    });
  }

  private initiReviewForm(): FormGroup {
    return this.fb.group({
      rating:   [ 0, Validators.required ],
      headline: [ null ],
      review:   [ null, Validators.required ]
    });
  }

  onSubmit(): void {
    console.log(this.reviewForm.value);
  }

  onClose(): void {
    this.showForm = false;
  }
}
