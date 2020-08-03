<?php

require './include/class-autoload.php';

$productCtrl = new Products();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    $URI = $_SERVER['PHP_SELF'];
    $productId = (int)substr($URI, strripos($URI, '/') + 1);
    
    if (!$productId) {
      http_response_code(400);      
    }
    else {
      echo json_encode($productCtrl->getProductVariants($productId));
    }
    break;

  case 'POST':
    $product = json_decode($_POST['product']);
    $images  = $_FILES['images'];
    
    if (empty($product) || empty($images)) {
      http_response_code(400);
    }
    else {
      $variantInfo = (object)$product->variantInfo;
      $productId = $productCtrl->addProduct($product, $images);

      if ($productId) {
        echo json_encode($productCtrl->addProductVariant($productId, $variantInfo));
      } else {
        http_response_code(400);
      }
    }
    break;
}