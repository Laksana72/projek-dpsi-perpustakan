# Software Requirements Specification (SRS)

# Library Management System Frontend

Version : 1.0.0

Status : Draft

Platform : Web

Project : Frontend Only

---

# 1. Introduction

## 1.1 Purpose

Dokumen ini menjelaskan seluruh kebutuhan fungsional dan non-fungsional untuk pengembangan Frontend Library Management System.

Dokumen ini digunakan sebagai Source of Truth (SoT) oleh AI Agent selama proses pengembangan sehingga seluruh implementasi mengikuti kebutuhan sistem yang telah disepakati.

Frontend hanya bertanggung jawab terhadap antarmuka pengguna, navigasi, validasi form, dan pengelolaan state lokal menggunakan Dummy Data.

Backend, Database, dan REST API berada di luar ruang lingkup dokumen ini.

---

## 1.2 Project Objective

Membangun website perpustakaan yang:

- Modern
- Responsive
- Mudah digunakan
- Konsisten
- Reusable
- Siap diintegrasikan dengan Backend

---

## 1.3 Project Scope

Project meliputi:

- Landing Page
- Login
- Dashboard User
- Dashboard Admin
- Katalog Buku
- Detail Buku
- Halaman Peminjaman
- Riwayat
- Denda
- Profil
- Logout

Project tidak mencakup:

- Backend
- Database
- REST API
- Authentication Server

---

## 1.4 Users

Sistem memiliki tiga jenis pengguna.

### Guest

Pengguna yang belum login.

### User

Mahasiswa / anggota perpustakaan.

### Admin

Petugas perpustakaan.

---

# 2. Functional Requirements

## FR-001 Landing Page

Deskripsi

Menampilkan halaman utama website.

Fitur

- Navbar
- Hero Section
- Informasi Perpustakaan
- Buku Populer
- Footer
- Tombol Login

---

## FR-002 Login

Deskripsi

Menampilkan form login.

Komponen

- Email
- Password
- Remember Me
- Login Button
- Forgot Password

Validasi

- Email wajib diisi
- Password wajib diisi

Output

Masuk ke Dashboard (Dummy).

---

## FR-003 Dashboard User

Dashboard berisi:

- Ringkasan
- Statistik
- Buku Populer
- Informasi terbaru
- Shortcut Menu

---

## FR-004 Book Catalog

Menampilkan daftar buku.

Fitur

- Search
- Filter
- Pagination
- Book Card

Informasi

- Cover
- Judul
- Penulis
- Kategori
- Status

---

## FR-005 Book Detail

Menampilkan:

- Cover
- Judul
- Penulis
- Tahun
- Penerbit
- ISBN
- Deskripsi
- Status
- Tombol Pinjam

---

## FR-006 Borrowing

Menampilkan:

Daftar buku yang dipinjam.

Kolom

- Cover
- Judul
- Status
- Tanggal Pinjam
- Tanggal Kembali

---

## FR-007 History

Menampilkan riwayat peminjaman.

Fitur

- Search
- Filter
- Pagination

---

## FR-008 Fine

Menampilkan:

- Total Denda
- Status Pembayaran
- Detail Denda

---

## FR-009 Profile

Menampilkan:

- Foto
- Nama
- Email
- NIM
- Program Studi

---

## FR-010 Logout

Menampilkan modal konfirmasi logout.

Tombol

- Cancel
- Logout

---

## FR-011 Admin Dashboard

Menampilkan:

- Statistik
- Ringkasan
- Jumlah Buku
- Jumlah Anggota
- Jumlah Peminjaman
- Jumlah Pengembalian

---

## FR-012 Book Management

Admin dapat melihat tabel buku.

Kolom

- Cover
- Judul
- Penulis
- Tahun
- Status

Tombol

- Tambah
- Edit
- Hapus

---

## FR-013 Borrowing Management

Admin dapat melihat seluruh data peminjaman.

Kolom

- Nama
- Buku
- Status
- Tanggal

---

## FR-014 Return Management

Admin dapat melihat data pengembalian.

Kolom

- Nama
- Buku
- Tanggal
- Status

---

# 3. Non Functional Requirements

## Performance

Website harus dapat dimuat kurang dari 3 detik pada koneksi internet normal.

---

## Responsive

Website harus mendukung:

Desktop

Laptop

Tablet

Mobile

---

## Accessibility

Website harus memiliki:

- Kontras warna yang baik
- Navigasi keyboard
- Label form yang jelas

---

## Maintainability

Kode harus mudah dipelihara.

Menggunakan reusable component.

---

## Scalability

Frontend harus mudah ditambahkan halaman baru tanpa mengubah struktur yang sudah ada.

---

## Reliability

Navigasi tidak boleh menghasilkan halaman kosong atau error.

---

# 4. User Interface Requirements

UI mengikuti desain Figma.

Tidak diperbolehkan mengubah:

- Layout
- Warna
- Typography
- Sidebar
- Header
- Card
- Button
- Table

---

# 5. Routing Requirements

Guest

/

/books

/about

/help

/login

---

User

/dashboard

/catalog

/book/:id

/borrowing

/history

/fine

/profile

---

Admin

/admin/dashboard

/admin/books

/admin/borrowings

/admin/returns

/admin/profile

---

# 6. Validation Rules

Login

Email wajib diisi.

Password wajib diisi.

Search

Minimal 1 karakter.

Form

Semua field wajib divalidasi.

---

# 7. Dummy Data Requirements

Frontend menggunakan Dummy Data.

Data meliputi:

Books

Categories

Users

Borrowings

Returns

Fine

Dashboard

Notification

---

# 8. Error Handling

Frontend harus memiliki:

404 Page

Loading State

Empty State

Error State

Skeleton Loading

---

# 9. Success Criteria

Frontend dianggap selesai apabila:

✓ Semua halaman Figma telah dibuat.

✓ Responsive.

✓ Routing berjalan.

✓ Seluruh komponen reusable.

✓ Dummy Data berjalan.

✓ Tidak terdapat error.

✓ Siap diintegrasikan dengan Backend.

---

# 10. Assumptions

Seluruh API akan tersedia pada tahap Backend.

Seluruh Dummy Data nantinya akan diganti menjadi REST API.

Frontend tidak menyimpan data permanen.

---

# 11. Constraints

Frontend hanya menggunakan:

- React

- TypeScript

- Tailwind CSS

- shadcn/ui

- React Router

Tidak diperbolehkan menggunakan framework frontend lain tanpa persetujuan.

---

# 12. AI Agent Development Rules

AI Agent wajib:

- Membaca seluruh folder docs/

- Mengikuti context.md

- Mengikuti design_system.md

- Mengikuti architecture.md

- Mengikuti coding_guidelines.md

- Mengikuti sprint_plan.md

- Mengikuti project_state.md

AI Agent tidak diperbolehkan:

- Membuat Backend

- Membuat Database

- Mengubah desain

- Mengubah struktur project

- Menghapus reusable component

Seluruh implementasi dilakukan berdasarkan Sprint.
