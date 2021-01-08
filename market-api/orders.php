<?php

require './include/class-autoload.php';

$newOrder = new Orders();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'POST':
    $order = json_decode(file_get_contents("php://input"));

    echo json_encode($newOrder->createOrder($order));
    break;
}