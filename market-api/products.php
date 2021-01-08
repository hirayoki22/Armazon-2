<?php

require './include/class-autoload.php';

$productCtrl = new Products();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $URI = $_SERVER['PHP_SELF'];
    $productId = (int)substr($URI, strripos($URI, '/') + 1);
    
    switch (true) {
      case !empty($productId) && $productId > 0:
        echo json_encode($productCtrl->getProducts($productId));
        break;
      
      default:
        echo json_encode($productCtrl->getProducts());
        break;
    }
    break;
  
  case 'POST':
    $product = json_decode($_POST['product']);
    $images  = $_FILES['images'];

    if (empty($product) || empty($images)) {
      http_response_code(400);
    } else {
      echo json_encode($productCtrl->addProduct($product, $images));
    }
    break;
}