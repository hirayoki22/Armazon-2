<?php

class ProductCntrl {
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

  protected function getProducts(int $productId = null) {
    $query = 'CALL spGetProducts(?)';

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $productId, PDO::PARAM_INT);
    $stmt->execute();
    $products = $stmt->fetchAll();
    
    if ($products) {
      $stmt->nextRowset();
      $images = $stmt->fetchAll();
      $stmt = null;

      return [ 'products' => $products, 'images' => $images ];
    } else {
      return null;
    }
  }

  protected function getProductImages(int $productId) {
    $query = 'SELECT imageUrl FROM tbl_product_image WHERE productId = ?';

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $productId, PDO::PARAM_INT);
    $stmt->execute();
    $images = $stmt->fetchAll();

    return $images;
  }

  protected function getOffsetProducts(int $start, int $count) {
    $query = 'SELECT *, productImage(productId) AS productImage 
    FROM tbl_products WHERE isVariant = 0 LIMIT ?, ?;';

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $start, PDO::PARAM_INT);
    $stmt->bindParam(2, $count, PDO::PARAM_INT);
    $stmt->execute();
    $products = $stmt->fetchAll();

    return $products;
  }

  protected function addProduct(object $product, $images) {
    $query1 = 'INSERT INTO tbl_products(
      productName, brand, productDesc, price, totalStock, categoryId
    ) VALUES (?, ?, ?, ?, ?, ?);';

    $stmt = $this->conn->prepare($query1);
    $stmt->bindParam(1, $product->productName, PDO::PARAM_STR);
    $stmt->bindParam(2, $product->brand,       PDO::PARAM_STR);
    $stmt->bindParam(3, $product->productDesc, PDO::PARAM_STR);
    $stmt->bindParam(4, $product->price,       PDO::PARAM_STR);
    $stmt->bindParam(5, $product->totalStock,  PDO::PARAM_INT);
    $stmt->bindParam(6, $product->categoryId,  PDO::PARAM_INT);
    $stmt->execute();

    $productId = $this->conn->lastInsertId();
    $imageUrls = $this->uploadProductImages($images, $productId);

    foreach($imageUrls as $image) {
      $query2 = 'INSERT INTO tbl_product_image(imageUrl, productId)
      VALUES (?, ?)';
      $stmt2 = $this->conn->prepare($query2);
      $stmt2->bindParam(1, $image,     PDO::PARAM_STR);
      $stmt2->bindParam(2, $productId, PDO::PARAM_INT);
      $stmt2->execute(); 
    }
    $stmt  = null;
    $stmt2 = null;

    return $productId;
  }

  protected function getProductVariants(int $productId) {
    $query = 'CALL spGetVariant(?);';
    
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $productId, PDO::PARAM_INT);
    $stmt->execute();
    $variants = $stmt->fetchAll();
    $stmt = null;

    return $variants;
  }

  protected function addProductVariant(int $productId, object $variantInfo) {
    $query = 'CALL spAddProductVariant(?, ?, ?, ?);';

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $productId,                       PDO::PARAM_INT);
    $stmt->bindParam(2, $variantInfo->productId,          PDO::PARAM_INT);
    $stmt->bindParam(3, $variantInfo->optionId,           PDO::PARAM_INT);
    $stmt->bindParam(4, $variantInfo->optionValue,        PDO::PARAM_STR);
    $stmt->execute();
    $stmt = null;

    return $this->conn->lastInsertId();
  }

  private function uploadProductImages($images, int $productId) {
    $localPath = "./product-images/full/product_$productId/";
    $remotePath = "http://127.0.0.1/market-api/product-images/full/product_$productId/";
    $imageUrls = [];

    if (!file_exists($localPath)) {
      mkdir($localPath);
    }

    foreach($images as $image) {
      $name = uniqid("product_$productId-", true).'.jpg';

      move_uploaded_file($image['tmp_name'], $localPath.$name);
      array_push($imageUrls, $remotePath.$name);
    }
    return $imageUrls;
  }

  protected function searchProduct(string $keyword, int $categoryId = null) {
    $query = 'CALL spSearchProduct(?, ?)';

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(1, $keyword,    PDO::PARAM_STR);
    $stmt->bindParam(2, $categoryId, PDO::PARAM_INT);
    $stmt->execute();
    $matches = $stmt->fetchAll();
    $stmt = null;

    return $matches;
  }

  protected function getCategories() {
    $query = 'SELECT * FROM tbl_categories;';

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    $categories = $stmt->fetchAll();
    $stmt = null;

    return $categories;
  }

  protected function getVariantOptions() {
    $query = 'SELECT * FROM tbl_variant_option;';

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    $options = $stmt->fetchAll();
    $stmt = null;

    return $options;
  }

  protected function __destruct() {
    $this->conn = null;
  }
}