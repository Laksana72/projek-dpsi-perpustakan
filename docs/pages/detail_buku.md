# Book Detail Page

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Halaman Detail Buku digunakan untuk menampilkan informasi lengkap mengenai sebuah buku yang dipilih pengguna.

Pengguna dapat:

- Melihat informasi lengkap buku
- Mengetahui status ketersediaan
- Membaca sinopsis
- Melihat informasi penerbit
- Melakukan peminjaman (Dummy)

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

AI Agent tidak diperbolehkan mengubah layout.

---

# 4. Layout Structure

User Layout

↓

Sidebar

↓

Header

↓

Breadcrumb

↓

Book Detail

↓

Related Books

---

# 5. Breadcrumb

Dashboard

>

Katalog Buku

>

Detail Buku

---

# 6. Book Detail Layout

Desktop menggunakan dua kolom.

Kolom Kiri

- Cover Buku

Kolom Kanan

- Informasi Buku

Tablet dan Mobile menggunakan satu kolom.

---

# 7. Book Cover

Ukuran

300 × 420 px

Border Radius

16 px

Shadow

Medium

Apabila cover tidak tersedia gunakan placeholder.

---

# 8. Book Information

Informasi yang ditampilkan:

Judul Buku

↓

Penulis

↓

Kategori

↓

ISBN

↓

Penerbit

↓

Tahun Terbit

↓

Jumlah Halaman

↓

Lokasi Rak

↓

Status

↓

Sinopsis

↓

Action Button

---

# 9. Status Badge

Status yang tersedia

Available

- Hijau

Borrowed

- Merah

Reserved

- Kuning

Status tampil menggunakan Badge Component.

---

# 10. Synopsis

Menampilkan ringkasan isi buku.

Minimal tiga paragraf menggunakan Dummy Data.

Jika sinopsis terlalu panjang gunakan tombol:

"Lihat Selengkapnya"

---

# 11. Book Information Card

Tambahan informasi:

Bahasa

↓

Edisi

↓

Tanggal Ditambahkan

↓

Kategori

↓

Publisher

↓

ISBN

↓

Call Number

---

# 12. Action Button

Button Primary

Pinjam Buku

Button Secondary

Kembali ke Katalog

---

# 13. Related Books

Judul

"Buku Serupa"

Menampilkan maksimal empat buku.

Grid

Desktop

4 Kolom

Tablet

2 Kolom

Mobile

1 Kolom

Setiap Book Card dapat diklik.

---

# 14. Components

Halaman menggunakan:

- Sidebar
- Header
- Breadcrumb
- Book Card
- Badge
- Button
- Information Card

Seluruh komponen wajib reusable.

---

# 15. User Flow

Dashboard

↓

Katalog Buku

↓

Klik Buku

↓

Detail Buku

↓

Klik Pinjam

↓

Halaman Peminjaman

atau

↓

Kembali ke Katalog

---

# 16. Navigation

Dashboard

↓

Katalog Buku

↓

Detail Buku

↓

Peminjaman

---

# 17. Dummy Data

Menggunakan:

src/data/books.ts

Tidak menggunakan Backend.

---

# 18. Interaction

Hover Button

↓

Background lebih gelap

---

Klik Pinjam Buku

↓

Halaman Peminjaman

(Dummy Navigation)

---

Klik Buku Serupa

↓

Detail Buku

---

Klik Kembali

↓

Katalog Buku

---

# 19. Loading State

Saat data dimuat tampilkan:

- Skeleton Cover
- Skeleton Title
- Skeleton Text
- Skeleton Button

---

# 20. Empty State

Jika data buku tidak ditemukan.

Tampilkan:

Illustration

↓

"Buku tidak ditemukan."

↓

Button

Kembali ke Katalog

---

# 21. Error State

Jika terjadi kesalahan.

Tampilkan:

Error Illustration

↓

Pesan Error

↓

Retry Button

---

# 22. Responsive

Desktop

2 Kolom

---

Laptop

2 Kolom

---

Tablet

1 Kolom

---

Mobile

1 Kolom

Cover berada di atas.

Informasi berada di bawah.

---

# 23. Accessibility

Semua tombol memiliki aria-label.

Book Cover memiliki alt text.

Navigasi dapat dilakukan menggunakan keyboard.

---

# 24. Acceptance Criteria

✓ Breadcrumb tampil.

✓ Cover Buku tampil.

✓ Informasi Buku lengkap.

✓ Status Badge tampil.

✓ Sinopsis tampil.

✓ Related Books tampil.

✓ Button Pinjam tampil.

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
