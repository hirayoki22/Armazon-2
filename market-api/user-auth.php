<?php
session_set_cookie_params(["SameSite" => "none"]); //none, lax, strict
session_set_cookie_params(["Secure" => "true"]); //false, true
session_set_cookie_params(["HttpOnly" => "true"]); //false, true

session_start();

require './include/class-autoload.php';

if (!isset($_SESSION['user'])) {
  echo '{"active":false}';
} else {
  $userCntrl = new User();
  $role = $userCntrl->checkAdminRole($_SESSION['user']);

  echo json_encode(['active' => true, 'role' => $role]);
}

