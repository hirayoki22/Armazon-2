<?php

spl_autoload_register(function ($className) {
  $URI = $_SERVER['REQUEST_URI'];
  $path = '';

  if (!strpos($URI, 'include')) {
    $path = './classes/'.strtolower($className).'.class.php'; 
  } else {
    $path = '../classes/'.strtolower($className).'.class.php';
  }

  include_once $path;
});