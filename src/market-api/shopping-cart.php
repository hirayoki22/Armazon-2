<?php

require './include/class-autoload.php';

$cart = new ShoppingCart();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $userId = (int)$_GET['userId'];
    $count  = !empty($_GET['count']) ? true : false;

    if (empty($userId)) {
      http_response_code(404);
      die();
    }    

    if (!$count) {
      echo json_encode($cart->getShoppingCart($userId));
    } else {
      echo json_encode($cart->getTotalCartItems($userId));
    }
 
    break;
  
  case 'POST':
    $item = json_decode(file_get_contents("php://input"));
    
    if (!$item) {
      http_response_code(400);
    } else {
      $userId    = $item->userId;
      $productId = $item->productId;
      $quantity  = $item->quantity;

      echo json_encode($cart->addToShoppingCart($userId, $productId, $quantity));
    }
    break;

  case 'PUT':
    $item = json_decode(file_get_contents("php://input"));

    if (!$item) {
      http_response_code(400);
    } else {
      $userId    = $item->userId;
      $productId = $item->productId;
      $quantity  = $item->quantity;

      echo json_encode($cart->updateItemQuantity($userId, $productId, $quantity));
    }
    break;

  case 'DELETE':
    $userId    = (int)$_GET['userId'];
    $productId = (int)$_GET['productId'];

    if (empty($userId) || empty($productId)) {
      http_response_code(404);
    } else {
      echo json_encode($cart->removeFromCart($userId, $productId));
    }
    break;
}