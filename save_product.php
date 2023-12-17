<?php
include 'database.php';
include 'ProductManager.php';

session_start();

$productManager = new ProductManager($conn);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama = $conn->real_escape_string($_POST['nama']);
    $detail = $conn->real_escape_string($_POST['detail']);
    $kategori = $conn->real_escape_string($_POST['kategori']);
    $jenis = implode(', ', $_POST['jenis']);
    $harga = $conn->real_escape_string($_POST['harga']);

    $browser = $_SERVER['HTTP_USER_AGENT'];
    $ipAddress = $_SERVER['REMOTE_ADDR'];

    $foto = '';
    if ($_FILES['foto']['error'] == 0) {
        $targetDir = 'img/';
        $targetFile = $targetDir . basename($_FILES['foto']['name']);
        if (move_uploaded_file($_FILES['foto']['tmp_name'], $targetFile)) {
            $foto = $conn->real_escape_string(basename($_FILES['foto']['name']));
        } else {
            echo json_encode(['error' => 'Gagal mengunggah gambar.']);
            exit();
        }
    }

    $sql = "INSERT INTO produk (nama, detail_produk, kategori, jenis, harga, foto, browser, ip_address) VALUES ('$nama', '$detail', '$kategori', '$jenis', '$harga', '$foto', '$browser', '$ipAddress')";

    if ($conn->query($sql) === TRUE) {
        $result = $conn->query("SELECT * FROM produk ORDER BY id DESC LIMIT 1");
        $responseData = $result->fetch_assoc();
        echo json_encode($responseData);
    } else {
        echo json_encode(['error' => 'Error: ' . $sql . '<br>' . $conn->error]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    parse_str(file_get_contents("php://input"), $deleteData);
    $productName = $conn->real_escape_string($deleteData['productName']);

    $deleteQuery = "DELETE FROM produk WHERE nama = '$productName'";
    
    if ($conn->query($deleteQuery) === TRUE) {
        echo json_encode(['success' => 'Data berhasil dihapus.']);
    } else {
        echo json_encode(['error' => 'Error: ' . $deleteQuery . '<br>' . $conn->error]);
    }

    exit();
} else {
    echo json_encode(['error' => 'Invalid request method!']);
}

$conn->close();
?>
