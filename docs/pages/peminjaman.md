# Borrowing Page

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Halaman Peminjaman digunakan untuk menampilkan daftar buku yang sedang dipinjam oleh pengguna.

Pengguna dapat:

- Melihat daftar buku yang sedang dipinjam
- Melihat tanggal pinjam
- Melihat batas waktu pengembalian
- Melihat status peminjaman
- Melihat jumlah denda (jika ada)
- Menuju halaman Detail Buku

Seluruh data menggunakan Dummy Data.

---

# 2. Target User

Halaman dapat diakses oleh:

- Mahasiswa
- Dosen
- Staff

---

# 3. Reference

Halaman harus mengikuti desain Dashboard User pada Figma.

AI Agent tidak diperbolehkan mengubah struktur layout.

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

Borrowing Summary

↓

Borrowing Table

↓

Pagination

---

# 5. Header

Header menggunakan komponen Header standar.

Berisi:

- Judul Halaman
- Notification
- User Avatar

---

# 6. Page Header

Title

Peminjaman Saya

Description

Daftar seluruh buku yang sedang Anda pinjam.

---

# 7. Borrowing Summary

Bagian ini menampilkan ringkasan.

Card 1

Total Buku Dipinjam

---

Card 2

Masih Dipinjam

---

Card 3

Jatuh Tempo Minggu Ini

---

Card 4

Total Denda

Semua menggunakan Statistic Card.

---

# 8. Borrowing Table

Menampilkan daftar peminjaman.

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

Jatuh Tempo

↓

Status

↓

Denda

↓

Aksi

---

# 9. Status Badge

Status yang tersedia:

Borrowed

Warna Hijau

---

Due Soon

Warna Kuning

---

Overdue

Warna Merah

---

Returned

Warna Abu-abu

---

# 10. Action

Button Detail

↓

Membuka Detail Buku

---

Button Perpanjang

↓

Placeholder

Belum memiliki fungsi.

---

# 11. Search

Search berada di atas tabel.

Placeholder

Cari buku yang dipinjam...

Filter dilakukan secara realtime menggunakan Dummy Data.

---

# 12. Filter

Filter yang tersedia:

Status

↓

Tanggal Pinjam

↓

Tanggal Jatuh Tempo

↓

Reset Filter

---

# 13. Pagination

Komponen:

Previous

↓

Page Number

↓

Next

Data per halaman:

10 Buku

---

# 14. Components

Halaman menggunakan:

- Sidebar
- Header
- Search
- Filter
- Statistic Card
- Table
- Badge
- Pagination
- Button

Seluruh komponen wajib reusable.

---

# 15. User Flow

Dashboard

↓

Klik Menu Peminjaman

↓

Halaman Peminjaman

↓

Klik Detail

↓

Detail Buku

---

# 16. Navigation

Dashboard

↓

Peminjaman

↓

Detail Buku

---

# 17. Dummy Data

Menggunakan:

src/data/borrowings.ts

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

Halaman Detail Buku

---

Klik Perpanjang

↓

Menampilkan Modal Placeholder

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

- Skeleton Summary Card
- Skeleton Table
- Skeleton Search

---

# 20. Empty State

Jika tidak ada data peminjaman.

Tampilkan:

Illustration

↓

"Belum ada buku yang sedang dipinjam."

↓

Button

Lihat Katalog Buku

---

# 21. Error State

Jika data gagal dimuat.

Tampilkan:

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

Table dapat di-scroll horizontal.

---

Mobile

Data ditampilkan dalam bentuk Card List.

---

# 23. Accessibility

Semua tombol memiliki aria-label.

Table dapat diakses menggunakan keyboard.

Search memiliki label.

Status Badge memiliki kontras warna yang memenuhi standar aksesibilitas.

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
