<?php

require './include/class-autoload.php';

$productCtrl = new Products();

echo json_encode($productCtrl->getVariantOptions());