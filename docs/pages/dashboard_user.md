# Dashboard User

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Dashboard User merupakan halaman utama setelah pengguna berhasil login.

Halaman ini memberikan ringkasan informasi akun pengguna, status peminjaman buku, informasi denda, buku populer, serta akses cepat menuju fitur utama aplikasi.

Halaman ini hanya mengimplementasikan Frontend menggunakan Dummy Data.

---

# 2. Target User

Dashboard digunakan oleh:

- Mahasiswa
- Dosen
- Staff

---

# 3. Reference

Halaman harus mengikuti desain Dashboard User yang telah ditentukan.

AI Agent tidak diperbolehkan mengubah susunan layout maupun posisi komponen.

---

# 4. Layout Structure

User Layout

↓

Sidebar

↓

Header

↓

Dashboard Content

---

Dashboard Content terdiri dari:

Greeting

↓

Statistics Cards

↓

Popular Books

↓

Quick Access

---

# 5. Sidebar

Sidebar berada di sisi kiri.

Width

240 px

Background

Primary Color

Menu

- Dashboard
- Katalog Buku
- Peminjaman Saya
- Riwayat
- Denda
- Profil
- Keluar

Dashboard menjadi menu aktif.

---

# 6. Header

Header berada di bagian atas.

Height

72 px

Background

White

Header terdiri dari:

- Judul Halaman
- Notification Icon
- Theme Switch (Placeholder)
- User Avatar

---

# 7. Greeting Section

Berisi sapaan kepada pengguna.

Contoh

Halo, Trump 👋

Selamat datang kembali di Sistem Perpustakaan.

Greeting diambil dari Dummy Data.

---

# 8. Statistics Cards

Dashboard memiliki empat kartu informasi.

Card 1

Buku Dipinjam

Card 2

Denda

Card 3

Riwayat

Card 4

Buku Tersedia

Setiap card terdiri dari:

- Icon
- Judul
- Nilai
- Deskripsi singkat

---

# 9. Popular Books

Judul

Buku Populer

Menampilkan maksimal 4 buku.

Grid

Desktop

4 Kolom

Tablet

2 Kolom

Mobile

1 Kolom

Setiap Book Card berisi:

- Cover
- Judul
- Penulis
- Status
- Button Detail

---

# 10. Quick Access

Menu akses cepat.

Berisi tombol:

- Katalog Buku
- Peminjaman Saya
- Riwayat
- Profil

Setiap tombol menggunakan Card.

---

# 11. Components

Dashboard menggunakan komponen berikut.

- Sidebar
- Header
- Statistic Card
- Book Card
- Quick Menu Card
- Badge
- Avatar
- Button

Seluruh komponen harus reusable.

---

# 12. User Flow

User Login

↓

Dashboard

↓

Memilih Menu Sidebar

↓

Membuka Halaman

atau

↓

Klik Buku

↓

Detail Buku

---

# 13. Navigation

Dashboard

↓

Katalog Buku

↓

Detail Buku

---

Dashboard

↓

Peminjaman Saya

---

Dashboard

↓

Riwayat

---

Dashboard

↓

Profil

---

Dashboard

↓

Logout

---

# 14. Dummy Data

Data berasal dari:

src/data/dashboard.ts

src/data/books.ts

src/data/user.ts

Tidak menggunakan Backend.

---

# 15. Interaction

Hover Card

↓

Shadow bertambah

↓

Card naik 2 px

---

Hover Sidebar

↓

Background lebih terang

---

Klik Book Card

↓

Detail Buku

---

Klik Quick Menu

↓

Halaman terkait

---

# 16. Loading State

Saat data dimuat.

Menampilkan:

Skeleton Card

Skeleton Book

Skeleton Statistics

---

# 17. Empty State

Jika tidak ada data.

Tampilkan:

Illustration

↓

Pesan

"Belum ada data."

↓

Button

Refresh

---

# 18. Error State

Jika gagal memuat data.

Menampilkan:

Error Illustration

↓

Pesan Error

↓

Retry Button

---

# 19. Responsive

Desktop

Sidebar tetap.

Grid

4 Kolom.

---

Laptop

Grid

2 Kolom.

---

Tablet

Sidebar berubah menjadi Drawer.

Grid

2 Kolom.

---

Mobile

Sidebar Hamburger.

Grid

1 Kolom.

---

# 20. Accessibility

Sidebar dapat diakses menggunakan keyboard.

Semua Button memiliki aria-label.

Tab berpindah secara berurutan.

---

# 21. Acceptance Criteria

✓ Sidebar tampil.

✓ Header tampil.

✓ Greeting tampil.

✓ Statistics Cards tampil.

✓ Buku Populer tampil.

✓ Quick Access tampil.

✓ Responsive.

✓ Menggunakan Dummy Data.

✓ Menggunakan reusable components.

✓ Mengikuti Design System.

---

# 22. AI Agent Notes

AI Agent wajib:

- Menggunakan User Layout.
- Menggunakan React + TypeScript.
- Menggunakan Tailwind CSS.
- Menggunakan Dummy Data.
- Menggunakan reusable component.
- Tidak membuat logic Backend.
- Tidak mengubah layout Dashboard.
- Mengikuti Coding Guidelines.
