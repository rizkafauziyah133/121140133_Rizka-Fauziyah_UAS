-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Des 2023 pada 13.27
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webrizka`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `produk`
--

CREATE TABLE `produk` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `detail_produk` text NOT NULL,
  `kategori` varchar(50) NOT NULL,
  `jenis` varchar(50) NOT NULL,
  `harga` decimal(10,2) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `browser` varchar(500) NOT NULL,
  `ip_address` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `produk`
--

INSERT INTO `produk` (`id`, `nama`, `detail_produk`, `kategori`, `jenis`, `harga`, `foto`, `browser`, `ip_address`) VALUES
(34, 'Keripik Pisang ', '\r\nKripik pisang adalah camilan yang terbuat dari pisang yang dipotong tipis dan kemudian dikeringkan atau digoreng hingga menjadi keripik. Proses pembuatan kripik pisang melibatkan pemotongan pisang menjadi irisan tipis, dan kemudian irisan tersebut diolah dengan cara dikeringkan atau digoreng dalam minyak panas. Setelah proses tersebut, kripik pisang biasanya diberi berbagai bumbu atau gula untuk memberikan rasa yang khas.', 'Makanan', 'Produk Rumahan', 25000.00, 'WhatsApp-Image-2022-05-31-at-10.41.11-AM.jpeg', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', '::1'),
(37, 'Keripik Talas', 'Keripik talas adalah camilan yang terbuat dari talas yang dipotong tipis, kemudian digoreng hingga kering dan renyah. Proses pembuatannya melibatkan pemotongan talas menjadi irisan tipis, lalu direndam dalam bumbu atau garam sebelum digoreng. Camilan ini sering diolah dengan variasi rasa, seperti rasa pedas, manis, atau gurih, sesuai dengan selera konsumen. Keripik talas menjadi populer sebagai alternatif camilan yang unik dan lezat.', 'Makanan', 'Produk Rumahan', 15000.00, 'th.jpeg', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', '::1'),
(100, 'Tas Daur Ulang', 'Tas daur ulang dari sampah plastik adalah produk yang dibuat dari bahan-bahan plastik yang sudah tidak terpakai lagi atau limbah plastik yang kemudian diolah ulang menjadi bahan baku untuk membuat tas baru. Proses ini melibatkan daur ulang plastik menjadi serat atau bahan yang kemudian dijadikan tas dengan berbagai macam desain dan ukuran.', 'Barang', 'Produk Daur Ulang, Produk Lokal', 30000.00, 'tas.jpg', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', '::1'),
(101, 'Seblak', 'Seblak merupakan makanan yang terbuat dari kerupuk basah yang direbus bersama dengan berbagai bahan tambahan seperti sayuran, daging, atau seafood.', 'Makanan', 'Produk Rumahan', 12000.00, 'seblak.jpg', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', '::1'),
(102, 'Kopi Bubuk Robusta Lampung Brazica', 'Kopi ini diolah dari biji kopi pilihan oleh petani yang berpengalaman. Kopi ini memiliki rasa seperti karamel dan nutty yang lebih daripada kopi lain', 'Lain-lain', 'Produk Lokal', 40000.00, 'kopi.jpg', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', '::1');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `produk`
--
ALTER TABLE `produk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
