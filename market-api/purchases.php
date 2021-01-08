<?php

require './include/class-autoload.php';
require './include/deliver-email.inc.php';

$controller = new Controller();

$firstName = trim($_POST['firstName']);
$lastName = trim($_POST['lastName']);
$email = trim($_POST['email']);
$order = json_decode($_POST['order']);


function calculateTotal($order) {
  define('SHIPPING', 10);
  define('SALES_TAXES', 1.53);
  $total = 0;

  foreach($order as $product) {
    $total += $product->price * $product->quantity; 
  }
  return $total + SHIPPING + SALES_TAXES;
}

$orderTotal = calculateTotal($order);

$buyer = (object)[
  'buyerId'    => 0,
  'firstName'  => $firstName,
  'lastName'   => $lastName,
  'email'      => $email,
  'orderTotal' => $orderTotal,
];

if ($controller->createOrder($buyer) > 0) {
  sendPuchaseConfirmation($firstName, $email, $orderTotal);
  echo 'Order placed!';
} else {
  die('Unable to place order');
}