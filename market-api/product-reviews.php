<?php

require './include/class-autoload.php';

$reviewCtrl = new ReviewRating();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $productId = !(empty($_GET['id']))     ? (int)$_GET['id']     : null;
    $offset    = !(empty($_GET['offset'])) ? (int)$_GET['offset'] : 0;
    $rowcount  = !(empty($_GET['count']))  ? (int)$_GET['count']  : null;


    if (empty($productId)) {
      http_response_code(400);
    } else {
      echo json_encode($reviewCtrl->getProductReviews($productId, $offset, $rowcount));
    }
    break;

  case 'POST':
    session_start();
    $review = json_decode(file_get_contents("php://input"));
    
    if (!isset($_SESSION['user']) || empty($review)) {
      http_response_code(400);
    } else {
      $review->username = $_SESSION['user'];
      echo json_encode($reviewCtrl->submitNewReview($review));
    }
    break;

  case 'PUT':
    # code...
    break;

  case 'DELETE':
    # code...
    break;
}