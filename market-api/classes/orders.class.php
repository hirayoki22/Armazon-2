<?php

class Orders extends OrdersCntrl {
  
  public function __construct() {
    parent::__construct();
  }

  public function createOrder(object $order) {
    return parent::createOrder($order);
  }

  public function __destruct() {
    parent::__destruct();
  }
}