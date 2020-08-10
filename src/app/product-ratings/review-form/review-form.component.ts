import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { ProductService } from 'src/app/product.service';
import { ReviewFormService } from './review-form.service';
import { ReviewRatingService } from '../review-rating.service';
import { Product } from 'src/app/product.model';
import { NewReview } from './new-review.model';
import { FormField } from 'src/app/shared/dynamic-form/form-field.class';

@Component({
  selector: 'review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {
  fields: FormField[];
  product: Product;
  showForm: boolean = false;
  isLoading: boolean = true;
  reviewSubmitted: boolean = false;
  userReviewExists: boolean = false;

  constructor(
    private ps: ProductService,
    private rs: ReviewRatingService,
    private rf: ReviewFormService
  ) { }

  ngOnInit(): void {
    this.rf.$formState.subscribe(productId => {
      this.fields = this.initFields();
      this.showForm = true;
      this.isLoading = true;

      this.getProduct(productId);
    });
  }

  getProduct(productId: number): void {
    this.ps.getProductById(productId).subscribe(product => {
      this.product = product;
      this.isLoading = false;
    });
  }

  onSubmit(form?: FormGroup): void {
    const review: NewReview = {
      productId: this.product.productId,
      userId: 14,
      headline: form.get('headline').value.trim(),
      review: form.get('review').value.trim(),
      rating: form.get('rating').value      
    }

    this.isLoading = true;
    this.rs.submitNewReview(review).subscribe(res => {
      if (res.existingRecord) {
        this.userReviewExists = true;
        form.reset();
      } else {
        this.reviewSubmitted = true;
        setTimeout(() => location.reload(), 2000);
      }
      this.isLoading = false;
    });
  }

  onClose(): void {
    this.showForm = false;
    this.reviewSubmitted = false;
    this.userReviewExists = false;
  }

  private initFields(): FormField[] {
    return [
      new FormField({
        fieldType: 'none',
        fieldKey: 'rating',
        fieldOrder: 1,
        validators: {
          sync: [ Validators.required ]
        }
      }),
      new FormField({
        fieldKey: 'headline',
        fieldLabel: 'Add a headline',
        fieldOrder: 2
      }),
      new FormField({
        fieldType: 'textarea',
        fieldKey: 'review',
        fieldLabel: 'Wire your review',
        fieldOrder: 3,
        validators: {
          sync: [ Validators.required ]
        }
      })
    ];
  }
}
