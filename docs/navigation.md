# Navigation
Version : 2.0

Project

UAD Library Management System

Platform

Web Application

---

# Navigation Overview

Aplikasi memiliki tiga jenis navigasi.

Guest Navigation

User Navigation

Administrator Navigation

Seluruh navigasi menggunakan React Router.

Tidak menggunakan page reload.

---

# Guest Flow

Landing Page

↓

Koleksi

↓

Tentang

↓

Bantuan

↓

Login

Guest tidak dapat mengakses halaman User maupun Admin.

Jika Guest mencoba mengakses halaman yang memerlukan autentikasi.

↓

Redirect ke Login.

---

# User Flow

Login

↓

Dashboard

↓

Katalog Buku

↓

Detail Buku

↓

Peminjaman Saya

↓

Riwayat

↓

Profil

↓

Logout

---

# Admin Flow

Login

↓

Dashboard Admin

↓

Data Buku

↓

Pengembalian

↓

Riwayat

↓

Profil

↓

Logout

---

# Route List

/

Landing Page

---

/koleksi

Katalog Buku

---

/tentang

Tentang Perpustakaan

---

/bantuan

Pusat Bantuan

---

/login

Login

---

/dashboard

Dashboard User

---

/dashboard/catalog

Katalog Buku

---

/dashboard/books/:id

Detail Buku

---

/dashboard/borrowings

Peminjaman Saya

---

/dashboard/history

Riwayat

---

/dashboard/profile

Profil

---

/admin/dashboard

Dashboard Admin

---

/admin/books

Data Buku

---

/admin/returns

Pengembalian Buku

---

/admin/history

Riwayat

---

/admin/profile

Profil Admin

---

# Navbar Navigation

Klik Logo

↓

Landing Page

---

Klik Beranda

↓

Landing Page

---

Klik Koleksi

↓

Halaman Koleksi

---

Klik Tentang

↓

Halaman Tentang

---

Klik Bantuan

↓

Halaman Bantuan

---

Klik Masuk

↓

Login

---

# Sidebar User

Dashboard

↓

Dashboard

Katalog Buku

↓

Catalog

Peminjaman

↓

Borrowings

Riwayat

↓

History

Profil

↓

Profile

Logout

↓

Landing Page

---

# Sidebar Admin

Dashboard

↓

Dashboard Admin

Data Buku

↓

Books

Pengembalian

↓

Returns

Riwayat

↓

History

Profil

↓

Profile

Logout

↓

Landing

---

# Redirect Rules

Guest

↓

Tidak boleh mengakses

/dashboard

/admin

↓

Redirect Login

---

User

↓

Tidak boleh mengakses

/admin/*

↓

Redirect Dashboard User

---

Admin

↓

Tidak boleh mengakses

/dashboard/*

↓

Redirect Dashboard Admin

---

# Breadcrumb

Landing

Tidak menggunakan Breadcrumb.

---

Dashboard

Home

/

Dashboard

---

Catalog

Home

/

Katalog Buku

---

Book Detail

Home

/

Katalog Buku

/

Detail Buku

---

Profile

Home

/

Profil

---

# 404 Page

Jika route tidak ditemukan.

↓

Halaman 404.

↓

Button

Kembali ke Beranda.

---

# AI Rules

AI wajib menggunakan React Router.

Tidak menggunakan anchor tag untuk navigasi internal.

Gunakan Link atau NavLink.

Menu aktif harus memiliki indikator.

Perpindahan halaman tidak boleh melakukan refresh browser.
