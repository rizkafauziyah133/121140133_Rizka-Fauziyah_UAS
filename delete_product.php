<?php
include 'database.php';


parse_str(file_get_contents("php://input"), $deleteData);
$productId = $conn->real_escape_string($deleteData['id']);

$deleteQuery = "DELETE FROM produk WHERE id = '$productId'";

if ($conn->query($deleteQuery) === TRUE) {
    echo json_encode(['success' => 'Data successfully deleted.']);
} else {
    echo json_encode(['error' => 'Error: ' . $deleteQuery . '<br>' . $conn->error]);
}

$conn->close();
?>
