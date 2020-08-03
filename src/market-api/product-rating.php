<?php

require './include/class-autoload.php';

$reviewCtrl = new ReviewRating();

$URI = $_SERVER['PHP_SELF'];
$productId = (int)substr($URI, strripos($URI, '/') + 1);

if (empty($productId)) {
  http_response_code(400);
} else {
  echo json_encode($reviewCtrl->getProductRating($productId));
}