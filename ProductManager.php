<?php

class ProductManager {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    public function getAllProducts() {
        $query = "SELECT * FROM produk";
        $result = $this->conn->query($query);

        $data = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }

        return $data;
    }

    public function addProduct($nama, $detail, $kategori, $jenis, $harga, $foto, $browser, $ipAddress) {
        $nama = $this->conn->real_escape_string($nama);
        $detail = $this->conn->real_escape_string($detail);
        $kategori = $this->conn->real_escape_string($kategori);
        $jenis = implode(', ', $jenis);
        $harga = $this->conn->real_escape_string($harga);

        $fotoPath = $this->uploadPhoto($foto);

        $sql = "INSERT INTO produk (nama, detail_produk, kategori, jenis, harga, foto, browser, ip_address) VALUES ('$nama', '$detail', '$kategori', '$jenis', '$harga', '$fotoPath', '$browser', '$ipAddress')";

        if ($this->conn->query($sql) === TRUE) {
            $lastInsertedId = $this->conn->insert_id;
            return $this->getProductById($lastInsertedId);
        } else {
            return ['error' => 'Error: ' . $sql . '<br>' . $this->conn->error];
        }
    }

    private function uploadPhoto($file) {
        $targetDir = 'img/';
        $targetFile = $targetDir . basename($file['name']);

        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            return $this->conn->real_escape_string(basename($file['name']));
        } else {
            return null;
        }
    }

    private function getProductById($productId) {
        $query = "SELECT * FROM produk WHERE id = $productId";
        $result = $this->conn->query($query);
        return $result->fetch_assoc();
    }
}
?>
