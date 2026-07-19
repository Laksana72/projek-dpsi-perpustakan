# Profile Page

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Halaman Profil digunakan untuk menampilkan informasi lengkap pengguna yang sedang login.

Pengguna dapat melihat informasi akun, status keanggotaan perpustakaan, statistik peminjaman, serta melakukan perubahan data profil pada tahap berikutnya.

Pada versi Frontend, seluruh data menggunakan Dummy Data.

---

# 2. Target User

Halaman dapat diakses oleh:

- Mahasiswa
- Dosen
- Staff

---

# 3. Reference

Halaman mengikuti Design System, Layout Specification, dan Component Specification.

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

Profile Information

↓

Membership Information

↓

Borrowing Statistics

↓

Account Settings

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

Profil Saya

Description

Lihat informasi akun dan keanggotaan perpustakaan.

---

# 7. Profile Information

Bagian ini menampilkan informasi utama pengguna.

Data yang ditampilkan:

Foto Profil

↓

Nama Lengkap

↓

Nomor Anggota

↓

Email

↓

Nomor Telepon

↓

Program Studi

↓

Fakultas

↓

Alamat

↓

Status Akun

---

# 8. Membership Information

Menampilkan informasi keanggotaan perpustakaan.

Data:

Nomor Anggota

↓

Jenis Anggota

↓

Tanggal Bergabung

↓

Masa Berlaku

↓

Status Keanggotaan

Status menggunakan Badge.

Active

Hijau

Expired

Merah

---

# 9. Borrowing Statistics

Menampilkan ringkasan aktivitas pengguna.

Card 1

Total Buku Dipinjam

---

Card 2

Buku Sedang Dipinjam

---

Card 3

Buku Sudah Dikembalikan

---

Card 4

Total Denda

---

# 10. Account Settings

Berisi tombol:

Edit Profil

↓

Ubah Password

↓

Keluar

Seluruh tombol masih berupa Placeholder.

---

# 11. Components

Halaman menggunakan:

- Sidebar
- Header
- Profile Card
- Statistic Card
- Badge
- Avatar
- Button

Seluruh komponen wajib reusable.

---

# 12. User Flow

Dashboard

↓

Profil

↓

Melihat Informasi

↓

Klik Edit Profil

↓

Placeholder

atau

↓

Klik Ubah Password

↓

Placeholder

atau

↓

Klik Keluar

↓

Logout Modal

---

# 13. Navigation

Dashboard

↓

Profil

↓

Logout

---

# 14. Dummy Data

Menggunakan:

src/data/user.ts

src/data/profile.ts

Tidak menggunakan Backend.

---

# 15. Interaction

Hover Card

↓

Shadow bertambah.

---

Hover Button

↓

Background lebih gelap.

---

Klik Edit Profil

↓

Placeholder

---

Klik Ubah Password

↓

Placeholder

---

Klik Keluar

↓

Logout Modal

---

# 16. Loading State

Menampilkan:

- Skeleton Avatar
- Skeleton Profile
- Skeleton Statistics

---

# 17. Empty State

Jika data profil tidak tersedia.

Tampilkan:

Illustration

↓

"Data profil tidak tersedia."

↓

Button

Refresh

---

# 18. Error State

Jika data gagal dimuat.

Menampilkan:

Error Illustration

↓

Pesan Error

↓

Retry Button

---

# 19. Responsive

Desktop

2 Kolom.

Kiri:

Informasi Profil.

Kanan:

Membership dan Statistics.

---

Laptop

2 Kolom.

---

Tablet

1 Kolom.

---

Mobile

Semua Card ditampilkan secara vertikal.

Sidebar berubah menjadi Hamburger Menu.

---

# 20. Accessibility

Avatar memiliki alt text.

Seluruh tombol memiliki aria-label.

Navigasi keyboard didukung.

Kontras warna mengikuti WCAG.

---

# 21. Acceptance Criteria

✓ Sidebar tampil.

✓ Header tampil.

✓ Informasi Profil tampil.

✓ Membership tampil.

✓ Statistics tampil.

✓ Button Edit Profil tampil.

✓ Button Ubah Password tampil.

✓ Button Logout tampil.

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
- Menggunakan reusable component.
- Menggunakan Dummy Data.
- Tidak membuat API Call.
- Mengikuti Design System.
- Mengikuti Coding Guidelines.
