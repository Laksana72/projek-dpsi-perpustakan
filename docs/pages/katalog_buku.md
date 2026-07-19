# Book Catalog Page

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Halaman Katalog Buku digunakan untuk menampilkan seluruh koleksi buku perpustakaan.

Pengguna dapat:

- Melihat daftar buku
- Mencari buku
- Memfilter kategori
- Membuka detail buku

Pada tahap ini seluruh data berasal dari Dummy Data.

---

# 2. Target User

Halaman dapat diakses oleh:

- Mahasiswa
- Dosen
- Staff

---

# 3. Reference

Halaman harus mengikuti desain Figma.

AI Agent tidak diperbolehkan mengubah urutan layout maupun posisi komponen.

---

# 4. Layout Structure

User Layout

↓

Sidebar

↓

Header

↓

Page Title

↓

Search & Filter

↓

Book Catalog Grid

↓

Pagination

---

# 5. Header

Header mengikuti User Layout.

Berisi:

- Judul Halaman
- Notification
- User Avatar

---

# 6. Page Title

Judul

Katalog Buku

Deskripsi

Temukan berbagai koleksi buku yang tersedia di perpustakaan.

---

# 7. Search Section

Search Bar berada di atas daftar buku.

Placeholder

Cari judul, penulis, atau ISBN...

Search dilakukan secara realtime menggunakan Dummy Data.

---

# 8. Filter Section

Filter berada di samping Search.

Filter yang tersedia:

Kategori

Status

Tahun Terbit

Urutkan Berdasarkan

- Judul A-Z
- Judul Z-A
- Terbaru
- Terlama

Button

Reset Filter

---

# 9. Book Catalog Grid

Desktop

4 Kolom

Laptop

3 Kolom

Tablet

2 Kolom

Mobile

1 Kolom

Gap

24 px

---

# 10. Book Card

Setiap kartu buku terdiri dari:

Cover Buku

↓

Judul Buku

↓

Penulis

↓

Kategori

↓

Tahun Terbit

↓

Status Badge

↓

Button Detail

---

# 11. Status Badge

Status tersedia:

Available

Warna

Hijau

---

Borrowed

Warna

Merah

---

Reserved

Warna

Kuning

---

# 12. Pagination

Berada di bagian bawah halaman.

Komponen:

Previous

↓

Nomor Halaman

↓

Next

Jumlah data per halaman

12 Buku

---

# 13. Components

Halaman menggunakan:

- Sidebar
- Header
- Search Input
- Select Filter
- Book Card
- Badge
- Pagination
- Button

Seluruh komponen wajib reusable.

---

# 14. User Flow

Dashboard

↓

Klik Menu Katalog Buku

↓

Halaman Katalog

↓

Cari Buku

atau

↓

Filter Buku

↓

Klik Detail

↓

Detail Buku

---

# 15. Navigation

Dashboard

↓

Katalog Buku

↓

Detail Buku

---

# 16. Dummy Data

Menggunakan:

src/data/books.ts

Tidak menggunakan Backend.

---

# 17. Interaction

Hover Book Card

↓

Card naik 2 px

↓

Shadow bertambah

---

Klik Book Card

↓

Detail Buku

---

Search

↓

Filter realtime

---

Filter

↓

Daftar Buku berubah

---

Reset

↓

Semua Buku tampil

---

# 18. Loading State

Menampilkan:

Skeleton Book Card

Skeleton Search

Skeleton Filter

---

# 19. Empty State

Jika hasil pencarian kosong.

Tampilkan:

Illustration

↓

Pesan

"Buku tidak ditemukan."

↓

Button

Reset Filter

---

# 20. Error State

Jika data gagal dimuat.

Menampilkan:

Error Illustration

↓

Pesan Error

↓

Retry Button

---

# 21. Responsive

Desktop

4 Kolom

---

Laptop

3 Kolom

---

Tablet

2 Kolom

Sidebar menjadi Drawer.

---

Mobile

1 Kolom

Sidebar menjadi Hamburger.

Search dan Filter ditampilkan secara vertikal.

---

# 22. Accessibility

Seluruh input memiliki label.

Book Card dapat dipilih menggunakan keyboard.

Button memiliki aria-label.

Tab berpindah secara berurutan.

---

# 23. Acceptance Criteria

✓ Sidebar tampil.

✓ Header tampil.

✓ Search tampil.

✓ Filter tampil.

✓ Grid Buku tampil.

✓ Pagination tampil.

✓ Search bekerja.

✓ Filter bekerja.

✓ Responsive.

✓ Menggunakan Dummy Data.

✓ Menggunakan reusable component.

✓ Mengikuti Design System.

---

# 24. AI Agent Notes

AI Agent wajib:

- Menggunakan User Layout.
- Menggunakan React + TypeScript.
- Menggunakan Tailwind CSS.
- Menggunakan Dummy Data.
- Menggunakan reusable component.
- Tidak membuat API Call.
- Mengikuti Coding Guidelines.
- Mengikuti Component Specification.
- Mengikuti Design System.
