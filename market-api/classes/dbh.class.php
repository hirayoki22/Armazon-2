<?php

class DBH {
  private $host;
  private $username;
  private $password;
  private $dbname;
  private const CONN_ERR = 'Unable to stablish connection, ERROR: ';

  public function __construct(
    string $host, 
    string $username,
    string $password,
    string $dbname
  ) {
    $this->host = $host;
    $this->username = $username;
    $this->password = $password;
    $this->dbname = $dbname;
  }

  public function connect() {
    $dsn = "mysql:host=$this->host;dbname=$this->dbname;charset=utf8";

    try {
      $pdo = new PDO($dsn, $this->username, $this->password);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

      return $pdo;
    } catch (PDOException $err) {
      die(self::CONN_ERR.$err->getMessage());
    }
  }
}