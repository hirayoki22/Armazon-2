<?php

class UserCntrl {
  private $conn;

  protected function __construct() {
    $dbh = new DBH(
      '127.0.0.1:5000',
      'root',
      'Adisonpaque2454!',
      'fxfactory_db'
    );

    $this->conn = $dbh->connect();
  }

  protected function authenticateUser(object $login) {
    $loginState = (object)[
      'success' => null, 
      'error'   => (object)[ 
        'username' => false, 
        'password' => false 
      ],
      'message' => null
    ];
    $getPassword = 'SELECT password FROM tbl_users WHERE email = ? OR username = ?';

    $stmt = $this->conn->prepare($getPassword);
    $stmt->bindParam(1, $login->username, PDO::PARAM_STR);
    $stmt->bindParam(2, $login->username, PDO::PARAM_STR);
    $stmt->execute();
    $result = $stmt->fetch();
    $stmt = null;

    if (!$result) { 
      $loginState->success = false;
      $loginState->error->username = true;
      $loginState->message = 'Username/email not found';
    } else {
      $hashed_password = $result->password;
      
      if (!password_verify($login->password, $hashed_password)) {
        $loginState->success = false;
        $loginState->error->password = true;
        $loginState->message = 'Invalid password';
      } else {
        $loginState->success = true;
        $loginState->message = 'User authenticated';
      }
    }
    return $loginState;
  }

  protected function checkAdminRole(string $username) {
    $query = 'SELECT accountRole FROM tbl_users 
    WHERE email = ? OR username = ?;';
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $username, PDO::PARAM_STR);
    $stmt->bindParam(2, $username, PDO::PARAM_STR);
    $stmt->execute();
    $role = $stmt->fetch();
    $stmt = null;

    return $role->accountRole;
  }

  protected function emailExists(string $email) {
    $query = 'SELECT email FROM tbl_users WHERE email = ?';
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $email, PDO::PARAM_STR);
    $stmt->execute();
    $exists = $stmt->fetch() ? true : false;
    $stmt = null;

    return [ 'exists' => $exists ];
  }

  protected function addUser(object $details) {
    $query = 'CALL spAddUser(?, ?, ?, ?, ?)';
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $details->firstName, PDO::PARAM_STR);
    $stmt->bindParam(2, $details->lastName,  PDO::PARAM_STR);
    $stmt->bindParam(3, $details->mobile,    PDO::PARAM_STR);
    $stmt->bindParam(4, $details->email,     PDO::PARAM_STR);
    $stmt->bindParam(5, $details->password,  PDO::PARAM_STR);
    $stmt->execute();
    $added = $stmt->rowCount() == 1 ? true : false;
    $stmt = null;

    return [ 'success' => $added ];
  }

  protected function getUserAccount(string $username) {
    $query = 'CALL spGetUserInformation(?);';

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $username, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch();
    $stmt = null;

    return $user;
  }

  protected function __destruct() {
    $this->conn = null;
  }
}