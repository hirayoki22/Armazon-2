<?php

class ReviewRating extends ReviewRatingCntrl {
  public function __construct() {
    parent::__construct();
  }

  public function getProductRating(int $productId) {
    $rating = parent::getProductRating($productId);
    $rating->overall      = (float)$rating->overall;
    $rating->totalReviews = (int)$rating->totalReviews;

    return $rating;
  }

  public function getProductReviews(
    int $productId, 
    int $offset = null,
    int $rowcount = null
  ) {
    $reviews = parent::getProductReviews($productId, $offset, $rowcount);
    
    foreach($reviews as $review) {
      $review->userRating = (float)$review->userRating;
      $review->likes      = (int)$review->likes;
      $review->dislikes   = (int)$review->dislikes;
    }
    return $reviews;
  }

  public function submitNewReview(object $review) {
    $review->review = nl2br($review->review);
    
    return parent::submitNewReview($review);
  }

  public function __destruct() {
    parent::__destruct();
  }
}