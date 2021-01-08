<?php
session_start();

switch ($_SERVER['REQUEST_METHOD']) {
  case 'GET':
    if (!isset($_SESSION['user'])) {
      http_response_code(401);
    } else {
      session_destroy();
      unset($_SESSION['user']);
      echo '{"loggedOut":true}';
    }
    break;
}

