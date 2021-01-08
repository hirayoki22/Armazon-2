<?php

require './include/class-autoload.php';

$userCntrl = new User();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (!isset($_GET['email'])) {
      http_response_code(400);
    } else {
      echo json_encode($userCntrl->emailExists($_GET['email']));
    }
    break;
  
  case 'POST':
    $details = json_decode(file_get_contents('php://input'));

    echo json_encode($userCntrl->addUser($details));
    break;

  case 'PUT':
    // 
    break;

  case 'DELETE':
    // 
    break;
}
