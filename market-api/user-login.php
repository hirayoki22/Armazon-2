<?php
session_start();

require './include/class-autoload.php';

$userCntrl = new User();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    http_response_code(404);
    break;
  
  case 'POST':
    $token = apache_request_headers()['Authorization'];
    $login = json_decode(file_get_contents('php://input'));

    if (empty($login) || empty($token)) {
      http_response_code(400);
    } else {
      echo json_encode($userCntrl->authenticateUser($login));
    }
    break;
}