<?php

class User extends UserCntrl {
  public function __construct() {
    parent::__construct();
  }

  public function authenticateUser(object $login) {
    $state = parent::authenticateUser($login);

    if ($state->success) {
      $_SESSION['user'] = $login->username;
    }
    return $state;
  }
  
  public function emailExists(string $email) {
    return parent::emailExists($email);
  }

  public function checkAdminRole(string $username) {
    return parent::checkAdminRole($username);
  }

  public function addUser(object $details) {
    $details->password = password_hash($details->password, PASSWORD_DEFAULT);

    return parent::addUser($details);
  }
  
  public function getUserAccount(string $username) {
    return parent::getUserAccount($username);
  }

  public function __destruct() {
    parent::__destruct();
  }
}