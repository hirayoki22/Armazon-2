<?php

class OrdersCntrl {
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

  protected function createOrder(object $order) {
    $query1 = 'INSERT INTO tbl_orders(orderTotal, userId) VALUES(?, ?);';
    $query2 = 'INSERT INTO tbl_order_products(
      orderId, productId, quantity, price, subtotal
    ) VALUES(?, ?, ?, ?, ?);';

    $stmt1 = $this->conn->prepare($query1);
    $stmt2 = $this->conn->prepare($query2);

    $stmt1->bindParam(1, $order->total,  PDO::PARAM_STR);
    $stmt1->bindParam(2, $order->userId, PDO::PARAM_INT);
    $stmt1->execute();

    $orderId = $this->conn->lastInsertId();

    foreach($order->items as $item) {
      $stmt2->bindParam(1, $orderId,         PDO::PARAM_INT);
      $stmt2->bindParam(2, $item->productId, PDO::PARAM_INT);
      $stmt2->bindParam(3, $item->quantity,  PDO::PARAM_INT);
      $stmt2->bindParam(4, $item->price,     PDO::PARAM_STR);
      $stmt2->bindParam(5, $item->subtotal,  PDO::PARAM_STR);
      $stmt2->execute();
    }

    $stmt1 = null;
    $stmt2 = null;

    return '';
  }

  protected function __destruct() {
    $this->conn = null;
  }
}