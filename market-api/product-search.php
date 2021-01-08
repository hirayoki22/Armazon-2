<?php

require './include/class-autoload.php';

$productCtrl = new Products();

if (!empty($_GET['keyword'])) {
  $categoryId = !empty($_GET['categoryId']) ? (int)$_GET['categoryId'] : null;

  echo json_encode($productCtrl->searchProduct($_GET['keyword'], $categoryId));
}