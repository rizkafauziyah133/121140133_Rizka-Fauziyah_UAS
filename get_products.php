<?php
include 'database.php';
include 'ProductManager.php';

$productManager = new ProductManager($conn);

$data = $productManager->getAllProducts();

echo json_encode($data);

$conn->close();
?>
