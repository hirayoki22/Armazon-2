import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ReviewFormService } from './review-form.service';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/product.model';
import { ReviewRatingService } from '../review-rating.service';
import { NewReview } from './new-review.model';

@Component({
  selector: 'review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {
  product: Product;
  reviewForm: FormGroup;
  showForm: boolean = false;
  isLoading: boolean = true;
  reviewSubmitted: boolean = true;
  userReviewExists: boolean = false;

  constructor(
    private ps: ProductService,
    private rs: ReviewRatingService,
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
      this.isLoading = false;
    });
  }

  private initiReviewForm(): FormGroup {
    return this.fb.group({
      rating:   [ null, Validators.required ],
      headline: [ null ],
      review:   [ null, Validators.required ]
    });
  }

  onRatingSelection(rating: number): void {
    this.reviewForm.get('rating').setValue(rating);
  }

  onSubmit(): void {
    const review: NewReview = {
      productId: this.product.productId,
      userId: 2,
      headline: this.reviewForm.get('headline').value.trim(),
      review: this.reviewForm.get('review').value.trim(),
      rating: this.reviewForm.get('rating').value      
    }

    this.isLoading = true;
    this.rs.submitNewReview(review).subscribe(res => {
      if (res.existingRecord) {
        console.log('You have already submitted a review for the ', this.product.productName);
        this.userReviewExists = true;
        this.reviewForm.reset();
      } else {
        this.reviewSubmitted = true;
      }
      this.isLoading = false;
    });
  }

  onClose(): void {
    this.showForm = false;
  }
}
