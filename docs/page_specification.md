# Page Specification

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Overview

Dokumen ini menjelaskan spesifikasi setiap halaman pada aplikasi.

Seluruh halaman harus mengikuti urutan komponen, layout, dan perilaku yang telah ditentukan.

Apabila terdapat informasi yang belum dijelaskan pada dokumen lain, maka AI Agent harus mengacu pada dokumen ini.

---

# 2. Landing Page

## Purpose

Sebagai halaman utama website sebelum pengguna login.

---

## Layout

Navbar

↓

Hero Section

↓

Book Collection Preview

↓

About Library

↓

Help Information

↓

Footer

---

## Navbar

Posisi

Fixed Top

Menu

- Home
- Collection
- About
- Help
- Login

Logo berada di sisi kiri.

Menu berada di tengah.

Login Button berada di kanan.

---

## Hero Section

Background menggunakan warna Primary.

Tinggi memenuhi satu layar pertama.

Isi

Heading

↓

Sub Heading

↓

Primary Button

↓

Secondary Button

↓

Illustration

Heading menggunakan ukuran terbesar.

Call To Action berada di sebelah kiri.

Ilustrasi berada di sebelah kanan.

---

## Collection Preview

Menampilkan maksimal 8 buku.

Disusun menggunakan Grid.

Desktop

4 Kolom

Tablet

2 Kolom

Mobile

1 Kolom

---

## About Section

Berisi penjelasan singkat mengenai perpustakaan.

Terdapat ilustrasi dan deskripsi.

---

## Help Section

Berisi informasi bantuan.

Menggunakan Card.

---

## Footer

Berisi

Logo

↓

Copyright

↓

Quick Links

↓

Contact

---

# 3. Login Page

## Layout

Desktop

Dua kolom.

Kiri

Ilustrasi.

Kanan

Login Form.

Tablet

Ilustrasi di atas.

Form di bawah.

Mobile

Form memenuhi layar.

---

## Form

Field

Email

Password

Remember Me

Forgot Password

Login Button

---

## Validation

Email wajib.

Password wajib.

---

## Action

Login berhasil

↓

Dashboard User

(Dummy Navigation)

---

# 4. Dashboard User

## Layout

Sidebar

↓

Header

↓

Greeting

↓

Statistic Cards

↓

Popular Books

↓

Latest Borrowing

↓

Quick Menu

---

## Greeting

Sapaan.

Nama User.

Tanggal Hari Ini.

---

## Statistic Cards

Jumlah

4

Isi

Jumlah Buku

↓

Sedang Dipinjam

↓

Sudah Dikembalikan

↓

Denda

---

## Popular Books

Grid Card.

Maksimal

8 Buku.

---

## Latest Borrowing

Table sederhana.

Kolom

Judul

Status

Tanggal

---

## Quick Menu

Shortcut menuju:

Book Catalog

Borrowings

History

Profile

---

# 5. Book Catalog

## Layout

Header

↓

Search

↓

Category Filter

↓

Book Grid

↓

Pagination

---

## Search

Realtime.

Placeholder

"Cari buku..."

---

## Category Filter

Dropdown.

---

## Book Grid

Desktop

4 Kolom

Laptop

3 Kolom

Tablet

2 Kolom

Mobile

1 Kolom

---

## Book Card

Cover

↓

Judul

↓

Penulis

↓

Kategori

↓

Status

↓

Detail Button

---

# 6. Book Detail

Layout dua kolom.

Kolom kiri

Cover.

Kolom kanan

Informasi.

---

Informasi

Judul

Penulis

Kategori

Penerbit

ISBN

Deskripsi

Status

Borrow Button

---

# 7. Borrowing Page

Header

↓

Summary Card

↓

Borrowing Table

↓

Pagination

---

Summary Card

Total Borrowing.

Active Borrowing.

Returned.

---

Borrowing Table

Cover

Judul

Tanggal Pinjam

Tanggal Kembali

Status

---

# 8. History Page

Header

↓

Search

↓

History Table

↓

Pagination

---

History Table

Judul

Tanggal

Status

Fine

---

# 9. Fine Page

Summary

↓

Fine Table

↓

Payment Status

---

Fine Table

Book

Amount

Status

Date

---

# 10. Profile Page

Avatar

↓

Personal Information

↓

Academic Information

↓

Membership Information

↓

Edit Profile Button

↓

Logout Button

---

# 11. Dashboard Admin

Header

↓

Statistics

↓

Book Summary

↓

Recent Borrowings

↓

Recent Returns

↓

Activity

---

Statistics

Jumlah Buku

↓

Jumlah Member

↓

Peminjaman

↓

Pengembalian

---

# 12. Manage Books

Header

↓

Search

↓

Filter

↓

Book Table

↓

Pagination

---

Book Table

Cover

Title

Author

Category

Status

Action

Edit

Delete

---

# 13. Borrowings (Admin)

Header

↓

Borrowing Table

↓

Pagination

---

Kolom

Nama

Buku

Tanggal

Status

---

# 14. Returns (Admin)

Header

↓

Return Table

↓

Pagination

---

Kolom

Nama

Buku

Tanggal

Status

---

# 15. Logout Modal

Center Screen

Icon

↓

Title

↓

Description

↓

Cancel Button

↓

Logout Button

---

# 16. Responsive Behavior

Desktop

Sidebar tetap.

4 Grid.

Laptop

Sidebar tetap.

3 Grid.

Tablet

Sidebar menjadi Drawer.

2 Grid.

Mobile

Drawer.

1 Grid.

---

# 17. Empty State

Illustration

↓

Message

↓

Primary Button

---

# 18. Loading State

Menggunakan Skeleton.

Tidak menggunakan Spinner.

---

# 19. Error State

Icon

↓

Title

↓

Description

↓

Retry Button

---

# 20. AI Agent Rules

AI Agent wajib:

- Membuat seluruh halaman sesuai urutan pada dokumen ini.
- Tidak menambah section baru.
- Tidak menghapus section yang sudah ditentukan.
- Menggunakan komponen reusable dari folder components/.
- Mengikuti Design System, Layout Specification, dan Component Specification.
- Menggunakan Dummy Data untuk seluruh konten.
- Menjaga konsistensi tampilan pada seluruh halaman.
