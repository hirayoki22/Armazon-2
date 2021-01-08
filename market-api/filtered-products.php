<?php

require './include/class-autoload.php';

$productCtrl = new Products();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (!isset($_GET['start']) || !isset($_GET['count'])) {
      http_response_code(404);
    } else {
      $start = (int)$_GET['start'];
      $count = (int)$_GET['count'];

      echo json_encode($productCtrl->getOffsetProducts($start, $count));
    }
    break;
}