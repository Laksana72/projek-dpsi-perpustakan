# Landing Page

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Landing Page merupakan halaman pertama yang dilihat pengguna sebelum login.

Halaman ini bertujuan untuk memperkenalkan sistem perpustakaan, menampilkan koleksi buku, memberikan informasi layanan, serta mengarahkan pengguna menuju halaman Login.

Target pengguna:

- Mahasiswa
- Dosen
- Staff
- Pengunjung

---

# 2. Reference

Mengacu pada desain Landing Page yang telah ditentukan pada dokumen Design System dan spesifikasi proyek.

AI Agent tidak diperbolehkan mengubah susunan section.

---

# 3. Layout Structure

Landing Page terdiri dari beberapa section.

Navbar

↓

Hero Section

↓

Search Section

↓

Library Features

↓

Book Collection Preview

↓

Footer

Semua section berada dalam satu halaman (Single Page).

---

# 4. Navbar

Posisi

Fixed Top

Background

Primary Color

Height

72 px

---

## Left Section

Logo Perpustakaan

Nama Perpustakaan

---

## Center Menu

- Beranda
- Koleksi
- Tentang
- Bantuan

---

## Right Section

Button

Masuk

Klik tombol akan menuju halaman Login.

---

# 5. Hero Section

Background menggunakan gambar gedung perpustakaan dengan overlay biru.

Height

600 px

---

## Content

Heading

Temukan Ilmu
Raih Masa Depan

Sub Heading

Temukan koleksi buku terbaik untuk mendukung kegiatan belajar, penelitian, dan pengembangan ilmu pengetahuan.

---

Search Box berada di bawah deskripsi.

---

# 6. Search Section

Terdiri dari

Search Input

Search Button

Placeholder

Cari judul buku...

Search hanya menggunakan Dummy Data.

---

# 7. Library Information

Menampilkan empat informasi utama.

Koleksi Lengkap

↓

Reservasi Online

↓

Notifikasi Pintar

↓

Akses Cepat

Disusun horizontal.

Desktop

4 Kolom

Tablet

2 Kolom

Mobile

1 Kolom

---

# 8. Book Collection Preview

Judul

Koleksi Perpustakaan

Menampilkan maksimal 8 buku.

Grid

Desktop

4 Kolom

Laptop

4 Kolom

Tablet

2 Kolom

Mobile

1 Kolom

---

## Book Card

Setiap kartu berisi:

- Cover Buku
- Judul
- Penulis
- Kategori
- Status
- Button Detail

Status menggunakan Badge.

Hijau

Tersedia

Merah

Dipinjam

---

# 9. Footer

Background

Primary Dark

Isi Footer

Logo

↓

Deskripsi singkat perpustakaan

↓

Navigasi

- Beranda
- Koleksi
- Tentang
- Bantuan

↓

Kontak

- Email
- Telepon
- Alamat

↓

Copyright

---

# 10. User Flow

Pengguna membuka Landing Page

↓

Melihat informasi perpustakaan

↓

Melakukan pencarian buku

↓

Melihat daftar buku

↓

Klik tombol Masuk

↓

Login Page

---

# 11. Components

Komponen yang digunakan:

- Navbar
- Hero
- Search Bar
- Button
- Book Card
- Badge
- Footer

Semua komponen harus reusable.

---

# 12. Interaction

Navbar tetap berada di atas saat halaman di-scroll.

Button memiliki efek hover.

Book Card memiliki efek hover.

Search Input menerima input pengguna.

Search Button melakukan filter Dummy Data.

---

# 13. Responsive

Desktop

Sidebar tidak digunakan.

Layout 4 kolom.

---

Tablet

Grid menjadi 2 kolom.

---

Mobile

Grid menjadi 1 kolom.

Navbar berubah menjadi Hamburger Menu.

---

# 14. Dummy Data

Menggunakan data dari:

src/data/books.ts

Tidak menggunakan API.

---

# 15. Acceptance Criteria

✓ Navbar tampil.

✓ Hero Section tampil.

✓ Search berfungsi dengan Dummy Data.

✓ Informasi layanan tampil.

✓ Preview buku tampil.

✓ Footer tampil.

✓ Responsive.

✓ Mengikuti Design System.

✓ Menggunakan reusable components.

---

# 16. AI Agent Notes

AI Agent wajib:

- Menggunakan Guest Layout.
- Menggunakan komponen reusable.
- Mengikuti Design System.
- Tidak mengubah urutan section.
- Menggunakan Tailwind CSS.
- Menggunakan React + TypeScript.
- Menggunakan Dummy Data.
