<?php

class ShoppingCart extends ShoppingCartCntrl {

  public function __construct() {
    parent::__construct();
  }

  public function getTotalCartItems(string $username) {
    $total = (int)parent::getTotalCartItems($username);
    return [ 'total' => $total ];
  }

  public function getShoppingCart(string $username) {
    $cart = parent::getShoppingCart($username);

    foreach($cart as $item) {
      $item->productId  = (int)$item->productId;
      $item->price      = (float)$item->price;
      $item->available  = (bool)$item->available;
      $item->totalStock = (int)$item->totalStock;
      $item->quantity   = (int)$item->quantity  ;     
      $item->subtotal   = (float)$item->subtotal;
    }
    return $cart;
  }

  public function addToShoppingCart(
    string $username, 
    int $productId,
    int $quantity
  ) {
    return parent::addToShoppingCart($username, $productId, $quantity);
  }

  public function updateItemQuantity(
    string $username, 
    int $productId,
    int $quantity
  ) { 
    return parent::updateItemQuantity($username, $productId, $quantity);
  }

  public function removeFromCart(string $username, int $productId) {
    return parent::removeFromCart($username, $productId);
  }

  public function __destruct() {
    parent::__destruct();
  }
}