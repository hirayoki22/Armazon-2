<?php

spl_autoload_register(function ($className) {
  $URI = $_SERVER['REQUEST_URI'];
  $path = '';

  if (!strpos($URI, 'include')) {
    $path = "classes/$className.class.php"; 
  } else {
    $path = "../classes/$className.class.php";
  }
  if (!file_exists($path)) { return false; }

  include_once $path;
});