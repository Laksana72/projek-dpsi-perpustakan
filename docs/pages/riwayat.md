# Borrowing History Page

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Halaman Riwayat digunakan untuk menampilkan seluruh aktivitas peminjaman buku yang pernah dilakukan oleh pengguna.

Halaman ini membantu pengguna melihat histori peminjaman, status pengembalian, serta riwayat denda.

Pada tahap ini seluruh data menggunakan Dummy Data.

---

# 2. Target User

Halaman dapat diakses oleh:

- Mahasiswa
- Dosen
- Staff

---

# 3. Reference

Halaman mengikuti Design System dan Layout Specification.

AI Agent tidak diperbolehkan mengubah struktur halaman.

---

# 4. Layout Structure

User Layout

↓

Sidebar

↓

Header

↓

Page Header

↓

History Summary

↓

Search & Filter

↓

History Table

↓

Pagination

---

# 5. Header

Menggunakan Header standar.

Berisi:

- Judul Halaman
- Notification
- User Avatar

---

# 6. Page Header

Title

Riwayat Peminjaman

Description

Melihat seluruh riwayat peminjaman buku yang pernah dilakukan.

---

# 7. History Summary

Menampilkan ringkasan aktivitas.

Card 1

Total Peminjaman

---

Card 2

Sudah Dikembalikan

---

Card 3

Masih Dipinjam

---

Card 4

Total Denda Dibayar

---

# 8. Search

Search berada di atas tabel.

Placeholder

Cari berdasarkan judul buku atau penulis...

Pencarian dilakukan secara realtime menggunakan Dummy Data.

---

# 9. Filter

Filter yang tersedia:

Status

↓

Kategori

↓

Tahun

↓

Reset Filter

---

# 10. History Table

Kolom:

No

↓

Cover

↓

Judul Buku

↓

Penulis

↓

Tanggal Pinjam

↓

Tanggal Kembali

↓

Status

↓

Denda

↓

Aksi

---

# 11. Status Badge

Status yang tersedia

Returned

Warna Hijau

---

Borrowed

Warna Biru

---

Overdue

Warna Merah

---

Lost

Warna Abu Gelap

---

# 12. Action

Button Detail

↓

Membuka Detail Buku

---

Button Pinjam Lagi

↓

Mengarah ke Detail Buku

Placeholder

---

# 13. Pagination

Komponen:

Previous

↓

Nomor Halaman

↓

Next

Jumlah data per halaman

10 Data

---

# 14. Components

Halaman menggunakan:

- Sidebar
- Header
- Statistic Card
- Search
- Filter
- Table
- Badge
- Pagination
- Button

Semua komponen wajib reusable.

---

# 15. User Flow

Dashboard

↓

Riwayat

↓

Cari Riwayat

↓

Klik Detail

↓

Detail Buku

atau

↓

Pinjam Lagi

↓

Detail Buku

---

# 16. Navigation

Dashboard

↓

Riwayat

↓

Detail Buku

---

# 17. Dummy Data

Menggunakan:

src/data/history.ts

src/data/books.ts

Tidak menggunakan Backend.

---

# 18. Interaction

Hover Row

↓

Background berubah menjadi abu-abu muda.

---

Klik Detail

↓

Detail Buku

---

Klik Pinjam Lagi

↓

Detail Buku

---

Search

↓

Filter realtime

---

Filter

↓

Data tabel berubah

---

# 19. Loading State

Menampilkan:

- Skeleton Card
- Skeleton Search
- Skeleton Table

---

# 20. Empty State

Jika belum memiliki riwayat.

Tampilkan:

Illustration

↓

"Belum ada riwayat peminjaman."

↓

Button

Lihat Katalog Buku

---

# 21. Error State

Jika data gagal dimuat.

Menampilkan:

Error Illustration

↓

Pesan Error

↓

Retry Button

---

# 22. Responsive

Desktop

Table penuh.

---

Laptop

Table responsive.

---

Tablet

Horizontal Scroll.

---

Mobile

Data ditampilkan dalam bentuk Card List.

---

# 23. Accessibility

Semua tombol memiliki aria-label.

Search dapat digunakan menggunakan keyboard.

Table mendukung navigasi keyboard.

Badge memiliki kontras warna yang sesuai.

---

# 24. Acceptance Criteria

✓ Sidebar tampil.

✓ Header tampil.

✓ Summary Card tampil.

✓ Search tampil.

✓ Filter tampil.

✓ Table tampil.

✓ Status Badge tampil.

✓ Pagination tampil.

✓ Responsive.

✓ Menggunakan Dummy Data.

✓ Menggunakan reusable components.

✓ Mengikuti Design System.

---

# 25. AI Agent Notes

AI Agent wajib:

- Menggunakan User Layout.
- Menggunakan React + TypeScript.
- Menggunakan Tailwind CSS.
- Menggunakan reusable component.
- Menggunakan Dummy Data.
- Tidak membuat API Call.
- Mengikuti Design System.
- Mengikuti Coding Guidelines.
