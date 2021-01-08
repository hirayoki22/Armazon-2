<?php
session_start();

require './include/class-autoload.php';

$userCntrl = new User();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (!isset($_SESSION['user'])) {
      http_response_code(404);
      die();
    } else {
      $user = $userCntrl->getUserAccount($_SESSION['user']);

      if ( $user) {
        echo json_encode($user);
      } else {
        http_response_code(400);
      }
    }
    break;
  
  case 'POST':
    // 
    break;

  case 'PUT':
    // 
    break;

  case 'DELETE':
    // 
    break;
}
