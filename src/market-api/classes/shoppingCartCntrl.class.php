<?php

class ShoppingCartCntrl {
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

  protected function getTotalCartItems(int $userId) {
    $query = 'SELECT SUM(quantity) as total
    FROM tbl_shopping_cart 
    WHERE userId = ?;';
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $userId, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetchAll();
    $stmt = null;
    
    return $result[0]->total;
  }

  protected function getShoppingCart(int $userId) {
    $query = 'CALL spGetShoppingCart(?);';
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $userId, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetchAll();
    $stmt = null;
    
    return $result;
  }

  protected function addToShoppingCart(
    int $userId, 
    int $productId,
    int $quantity
  ) {
    $query = 'CALL spAddToShoppingCart(?, ?, ?, @output);';
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $userId,    PDO::PARAM_INT);
    $stmt->bindParam(2, $productId, PDO::PARAM_INT);
    $stmt->bindParam(3, $quantity,  PDO::PARAM_INT);
    $stmt->execute();

    $state = $this->conn->query('SELECT @output AS state')->fetch();
    $stmt = null;
    
    return $state;
  }

  protected function updateItemQuantity(
    int $userId, 
    int $productId,
    int $quantity
  ) {
    $query = 'CALL spUpdateCartItemQuantity(?, ?, ?);';
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $userId,    PDO::PARAM_INT);
    $stmt->bindParam(2, $productId, PDO::PARAM_INT);
    $stmt->bindParam(3, $quantity,  PDO::PARAM_INT);   
    $stmt->execute();

    return (int)$stmt->rowCount();
  }

  protected function removeFromCart(int $userId, int $productId) {
    $query = 'CALL spRemoveFromCart(?, ?);';
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $userId,    PDO::PARAM_INT);
    $stmt->bindParam(2, $productId, PDO::PARAM_INT);
    $stmt->execute();

    return (int)$stmt->rowCount();
  }

  protected function __destruct() {
    $this->conn = null;
  }
}