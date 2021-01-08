<?php
session_start();

require './include/class-autoload.php';

$cart = new ShoppingCart();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $count = !empty($_GET['count']) ? true : false;

    if (!isset($_SESSION['user'])) {
      http_response_code(400);
    } else {
      if (!$count) {
        echo json_encode($cart->getShoppingCart($_SESSION['user']));
      } else {
        echo json_encode($cart->getTotalCartItems($_SESSION['user']));
      }
    }  
    break;
  
  case 'POST':
    $item = json_decode(file_get_contents("php://input"));
    
    if (!isset($_SESSION['user']) || !$item) {
      http_response_code(400);
    } else {
      $productId = $item->productId;
      $quantity  = $item->quantity;

      echo json_encode($cart->addToShoppingCart(
        $_SESSION['user'], 
        $productId, 
        $quantity
      ));
    }
    break;

  case 'PUT':
    $item = json_decode(file_get_contents("php://input"));

    if (!isset($_SESSION['user']) || !$item) {
      http_response_code(400);
    } else {
      $productId = $item->productId;
      $quantity  = $item->quantity;

      echo json_encode($cart->updateItemQuantity(
        $_SESSION['user'], 
        $productId, 
        $quantity
      ));
    }
    break;

  case 'DELETE':
    if (!isset($_SESSION['user'])) {
      http_response_code(400);
    } else {
      $productId = (int)$_GET['productId'];
      echo json_encode($cart->removeFromCart($_SESSION['user'], $productId));
    }
    break;
}