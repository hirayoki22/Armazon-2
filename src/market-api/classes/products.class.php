<?php

class Products extends ProductCntrl {
  public function __construct() {
    parent::__construct();
  }

  public function addProduct(object $product, $images) {
    $product->productDesc = nl2br($product->productDesc);
    $productId = parent::addProduct($product, $this->refactorImages($images));

    // return $this->getProducts($productId);
    return $productId;
  }
 
  public function addProductVariant(int $productId, object $variantInfo) {
    return parent::addProductVariant($productId, $variantInfo);
  }

  public function getProducts(int $productId = null) {
    $temp = parent::getProducts($productId);
    
    if ($temp) {
      $resultSet = (object)$temp;
      $products  = $this->parseDataTypes($resultSet->products);    
      $images    = $resultSet->images;

      $this->setImages($products, $images);
      return $productId ? $products[0] : $products;
    } 
    else { return $temp; }
  }

  private function parseDataTypes($products) {
    foreach($products as $product) {
      $product->productId  = (int)$product->productId;
      $product->price      = (float)$product->price;
      $product->available  = (bool)$product->available;
      $product->totalStock = (int)$product->totalStock;
      $product->categoryId = (int)$product->categoryId;     
      $product->images     = [];
      $product->hasVariant = (bool)$product->hasVariant;
    }
    return $products;
  }

  public function getOffsetProducts(int $start, int $count) {
    $products = parent::getOffsetProducts($start, $count);

    return $this->parseDataTypes($products);
  }

  private function setImages($products, $images) {
    foreach($products as $product) {    
      foreach($images as $image) {
        if ($image->productId == $product->productId) {
          array_push($product->images, $image->imageUrl);
        }
      }
    }
  }

  private function refactorImages($images) {
    $formatted = [];
    $keys = array_keys($images);
  
    for ($i = 0; $i < COUNT($images['name']); $i++) {
      foreach($keys as $key) {
        $formatted[$i][$key] = $images[$key][$i];
      }
    }
    return $formatted;
  }

  public function getProductVariants(int $productId) {
    $variants = parent::getProductVariants($productId);

    foreach($variants as $variant) {
      $variant->variantId  = (int)$variant->variantId;
      $variant->available  = (bool)$variant->available;
    }
    return $variants;
  }

  public function getCategories() {
    $categories = parent::getCategories();

    foreach($categories as $category) {
      $category->categoryId = (int)$category->categoryId;
    }
    return $categories;
  }

  public function getVariantOptions() {
    $options = parent::getVariantOptions();

    foreach($options as $option) {
      $option->optionId = (int)$option->optionId;
    }
    return $options;
  }

  public function __destruct() {
    parent::__destruct();
  }
}