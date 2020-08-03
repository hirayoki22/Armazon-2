<?php

class ShoppingCart extends ShoppingCartCntrl {

  public function __construct() {
    parent::__construct();
  }

  public function getTotalCartItems(int $userId) {
    $total = (int)parent::getTotalCartItems($userId);
    return [ 'total' => $total ];
  }

  public function getShoppingCart(int $userId) {
    $cart = parent::getShoppingCart($userId);

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
    int $userId, 
    int $productId,
    int $quantity
  ) {
    return parent::addToShoppingCart($userId, $productId, $quantity);
  }

  public function updateItemQuantity(
    int $userId, 
    int $productId,
    int $quantity
  ) { 
    return parent::updateItemQuantity($userId, $productId, $quantity);
  }

  public function removeFromCart(int $userId, int $productId) {
    return parent::removeFromCart($userId, $productId);
  }

  public function __destruct() {
    parent::__destruct();
  }
}