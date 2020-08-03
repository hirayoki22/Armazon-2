<?php

class ReviewRatingCntrl {
  private $conn;

  protected function __construct() {
    $dbh = new DBH(
      '127.0.0.1:5000',
      'root',
      'Adisonpaque2454!',
      'fxfactory_db'
    );

    $this->conn = $dbh->connect();
  }

  protected function getProductRating(int $productId) {
    $query = 'SELECT ROUND(SUM(rating) / COUNT(rating), 1) AS `overall`,
    COUNT(rating) `totalReviews` FROM tbl_product_reviews WHERE productId = ?;';

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $productId, PDO::PARAM_INT);
    $stmt->execute();
    $rating = $stmt->fetch();
    $stmt = null;

    return $rating;
  }

  protected function getProductReviews(
    int $productId, 
    int $offset = null,
    int $rowcount = null
  ) {
    $query = 'CALL spGetProductReviews(?, ?, ?);';

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $productId, PDO::PARAM_INT);
    $stmt->bindParam(2, $offset,    PDO::PARAM_INT);
    $stmt->bindParam(3, $rowcount,  PDO::PARAM_INT);
    $stmt->execute();
    $reviews = $stmt->fetchAll();
    $stmt = null;

    return $reviews;
  }

  protected function submitNewReview(object $review) {
    $query = 'INSERT INTO tbl_product_reviews(productId, userId, headline, review, rating)
    VALUES (?, ?, ?, ?, ?);';

    try {
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $review->productId, PDO::PARAM_INT);
      $stmt->bindParam(2, $review->userId,    PDO::PARAM_INT);
      $stmt->bindParam(3, $review->headline,  PDO::PARAM_STR);
      $stmt->bindParam(4, $review->review,    PDO::PARAM_STR);
      $stmt->bindParam(5, $review->rating,    PDO::PARAM_INT);
      $stmt->execute();

      return $stmt->rowCount();
    } catch(PDOException $e) {
      if ($e->errorInfo[1] == 1062) {
        return [ 'existingRecord' => true ];
      }
    }
    $stmt = null;
  }

  protected function __destruct() {
    $this->conn = null;
  }
}