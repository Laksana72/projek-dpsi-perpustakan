# Return Management Page

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Halaman Pengembalian digunakan oleh Administrator untuk mengelola proses pengembalian buku yang dipinjam oleh anggota perpustakaan.

Administrator dapat:

- Melihat daftar buku yang harus dikembalikan
- Melihat status pengembalian
- Melihat keterlambatan
- Melihat jumlah denda
- Mengonfirmasi pengembalian buku

Pada tahap Frontend seluruh data menggunakan Dummy Data.

---

# 2. Target User

Halaman hanya dapat diakses oleh:

- Administrator
- Petugas Perpustakaan

---

# 3. Reference

Halaman mengikuti Design System.

Layout mengikuti Layout Specification.

Komponen mengikuti Component Specification.

AI Agent tidak diperbolehkan mengubah struktur halaman.

---

# 4. Layout Structure

Admin Layout

↓

Sidebar

↓

Header

↓

Page Header

↓

Summary Card

↓

Search & Filter

↓

Return Table

↓

Pagination

---

# 5. Header

Menggunakan Header standar Admin.

Berisi:

- Judul Halaman
- Search
- Notification
- Admin Avatar

---

# 6. Page Header

Title

Pengembalian Buku

Description

Kelola proses pengembalian buku oleh anggota perpustakaan.

---

# 7. Summary Cards

Menampilkan empat informasi utama.

Card 1

Total Pengembalian Hari Ini

---

Card 2

Belum Dikembalikan

---

Card 3

Terlambat

---

Card 4

Total Denda Hari Ini

---

# 8. Search

Placeholder

Cari anggota, judul buku, atau nomor anggota...

Search dilakukan secara realtime menggunakan Dummy Data.

---

# 9. Filter

Filter yang tersedia.

Status

↓

Tanggal Pengembalian

↓

Kategori Buku

↓

Reset Filter

---

# 10. Return Table

Kolom tabel.

No

↓

Nomor Anggota

↓

Nama Anggota

↓

Cover Buku

↓

Judul Buku

↓

Tanggal Pinjam

↓

Jatuh Tempo

↓

Tanggal Pengembalian

↓

Jumlah Hari Terlambat

↓

Denda

↓

Status

↓

Aksi

---

# 11. Status Badge

Returned

Hijau

---

Pending

Kuning

---

Late Return

Merah

---

Lost

Abu Gelap

---

# 12. Action

Setiap baris memiliki tombol.

Detail

↓

Melihat Detail Buku

---

Konfirmasi

↓

Placeholder

---

Cetak Bukti

↓

Placeholder

---

# 13. Pagination

Komponen.

Previous

↓

Nomor Halaman

↓

Next

Jumlah data.

10 data per halaman.

---

# 14. Components

Halaman menggunakan.

- Sidebar
- Header
- Statistic Card
- Search Input
- Filter Select
- Table
- Badge
- Pagination
- Button
- Modal

Seluruh komponen wajib reusable.

---

# 15. User Flow

Dashboard Admin

↓

Menu Pengembalian

↓

Melihat Daftar Pengembalian

↓

Cari Data

↓

Filter Data

↓

Klik Detail

atau

↓

Klik Konfirmasi

↓

Status berubah

(Dummy)

---

# 16. Navigation

Dashboard Admin

↓

Pengembalian

↓

Detail Buku

---

# 17. Dummy Data

Menggunakan.

src/data/returns.ts

src/data/books.ts

src/data/users.ts

Tidak menggunakan Backend.

---

# 18. Interaction

Hover Row

↓

Background berubah.

---

Klik Detail

↓

Detail Buku

---

Klik Konfirmasi

↓

Modal Konfirmasi

↓

Status berubah

(Dummy)

---

Klik Cetak Bukti

↓

Placeholder

---

Search

↓

Realtime Filter

---

Filter

↓

Data berubah

---

# 19. Loading State

Menampilkan.

- Skeleton Summary
- Skeleton Search
- Skeleton Table

---

# 20. Empty State

Jika belum ada data.

Tampilkan.

Illustration

↓

Belum ada data pengembalian.

↓

Button

Refresh

---

# 21. Error State

Jika gagal memuat data.

Menampilkan.

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

Table horizontal scroll.

---

Mobile

Data berubah menjadi Card List.

Sidebar menjadi Hamburger Menu.

---

# 23. Accessibility

Search memiliki label.

Seluruh tombol memiliki aria-label.

Table dapat diakses menggunakan keyboard.

Badge memiliki kontras sesuai standar WCAG.

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

✓ Menggunakan reusable component.

✓ Mengikuti Design System.

---

# 25. AI Agent Notes

AI Agent wajib.

- Menggunakan Admin Layout.
- Menggunakan React + TypeScript.
- Menggunakan Tailwind CSS.
- Menggunakan reusable component.
- Menggunakan Dummy Data.
- Tidak membuat API Call.
- Mengikuti Design System.
- Mengikuti Coding Guidelines.
