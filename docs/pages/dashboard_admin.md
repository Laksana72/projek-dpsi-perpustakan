# Admin Dashboard

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Dashboard Admin merupakan halaman utama setelah Administrator berhasil login.

Halaman ini digunakan untuk memonitor seluruh aktivitas perpustakaan secara ringkas serta memberikan akses cepat menuju seluruh fitur administrasi.

Pada tahap Frontend seluruh data menggunakan Dummy Data.

---

# 2. Target User

Halaman hanya dapat diakses oleh:

- Administrator
- Petugas Perpustakaan

---

# 3. Reference

Halaman harus mengikuti Design System, Layout Specification, Navigation, dan Component Specification.

AI Agent tidak diperbolehkan mengubah struktur layout.

---

# 4. Layout Structure

Admin Layout

↓

Sidebar

↓

Header

↓

Dashboard Content

Dashboard Content terdiri dari:

Page Header

↓

Summary Statistics

↓

Quick Actions

↓

Recent Activities

↓

Book Status

↓

Latest Borrowings

↓

Latest Returns

↓

Top Borrowed Books

---

# 5. Sidebar

Sidebar berada di sisi kiri.

Width

240 px

Menu

- Dashboard
- Kelola Buku
- Data Peminjaman
- Data Pengembalian
- Riwayat
- Profil
- Keluar

Dashboard menjadi menu aktif.

---

# 6. Header

Header terdiri dari:

- Page Title
- Search
- Notification
- Admin Avatar

Height

72 px

Background

White

---

# 7. Page Header

Title

Dashboard Admin

Description

Kelola seluruh aktivitas perpustakaan melalui dashboard administrator.

---

# 8. Summary Statistics

Menampilkan enam kartu statistik.

Card 1

Total Buku

Icon

Book

---

Card 2

Total Anggota

Icon

Users

---

Card 3

Buku Dipinjam

Icon

Book Open

---

Card 4

Buku Terlambat

Icon

Clock Alert

---

Card 5

Pengembalian Hari Ini

Icon

Undo

---

Card 6

Total Denda

Icon

Wallet

Setiap card terdiri dari:

- Icon
- Judul
- Nilai
- Persentase perubahan

---

# 9. Quick Actions

Menampilkan shortcut menuju fitur utama.

Card

Tambah Buku

↓

Kelola Buku

↓

Data Peminjaman

↓

Data Pengembalian

↓

Laporan

↓

Pengaturan

---

# 10. Recent Activities

Menampilkan aktivitas terbaru.

Contoh

Mahasiswa meminjam buku.

↓

Mahasiswa mengembalikan buku.

↓

Admin menambahkan buku baru.

↓

Admin memperbarui data buku.

Data maksimal

10 aktivitas.

---

# 11. Book Status

Menampilkan ringkasan jumlah buku.

- Available
- Borrowed
- Reserved
- Lost

Menggunakan Progress Card.

---

# 12. Latest Borrowings

Menampilkan tabel peminjaman terbaru.

Kolom

No

↓

Nama Anggota

↓

Judul Buku

↓

Tanggal Pinjam

↓

Jatuh Tempo

↓

Status

↓

Aksi

---

# 13. Latest Returns

Menampilkan tabel pengembalian terbaru.

Kolom

No

↓

Nama Anggota

↓

Judul Buku

↓

Tanggal Kembali

↓

Status

↓

Denda

↓

Aksi

---

# 14. Top Borrowed Books

Menampilkan 5 buku yang paling sering dipinjam.

Setiap card berisi:

- Cover
- Judul
- Penulis
- Jumlah Peminjaman

---

# 15. Search

Search digunakan untuk mencari:

- Buku
- Anggota
- Peminjaman

Realtime menggunakan Dummy Data.

---

# 16. Components

Dashboard menggunakan:

- Sidebar
- Header
- Statistic Card
- Activity Card
- Table
- Badge
- Search
- Progress Card
- Button
- Avatar

Seluruh komponen wajib reusable.

---

# 17. User Flow

Admin Login

↓

Dashboard Admin

↓

Melihat Statistik

↓

Memilih Menu Sidebar

↓

Masuk ke halaman terkait

---

# 18. Navigation

Dashboard Admin

↓

Kelola Buku

↓

Data Peminjaman

↓

Pengembalian

↓

Profil

↓

Logout

---

# 19. Dummy Data

Menggunakan:

src/data/admin_dashboard.ts

src/data/books.ts

src/data/borrowings.ts

src/data/returns.ts

src/data/users.ts

Tidak menggunakan Backend.

---

# 20. Interaction

Hover Card

↓

Shadow bertambah.

---

Klik Quick Action

↓

Menu terkait.

---

Klik Row Table

↓

Detail Data.

---

Hover Sidebar

↓

Background berubah.

---

# 21. Loading State

Menampilkan:

- Skeleton Card
- Skeleton Table
- Skeleton Activity
- Skeleton Book Card

---

# 22. Empty State

Jika belum ada data.

Tampilkan:

Illustration

↓

"Belum ada data."

↓

Button Refresh

---

# 23. Error State

Jika gagal memuat data.

Menampilkan:

Error Illustration

↓

Pesan Error

↓

Retry Button

---

# 24. Responsive

Desktop

Sidebar tetap.

Grid 3 kolom.

---

Laptop

Grid 2 kolom.

---

Tablet

Sidebar menjadi Drawer.

Grid 2 kolom.

---

Mobile

Sidebar Hamburger.

Semua tabel berubah menjadi Card List.

Quick Action ditampilkan vertikal.

---

# 25. Accessibility

Semua Button memiliki aria-label.

Table mendukung keyboard navigation.

Search memiliki label.

Kontras warna mengikuti WCAG.

---

# 26. Acceptance Criteria

✓ Sidebar tampil.

✓ Header tampil.

✓ Statistics tampil.

✓ Quick Action tampil.

✓ Activity tampil.

✓ Latest Borrowings tampil.

✓ Latest Returns tampil.

✓ Top Borrowed Books tampil.

✓ Search berjalan.

✓ Responsive.

✓ Menggunakan Dummy Data.

✓ Menggunakan reusable components.

✓ Mengikuti Design System.

---

# 27. AI Agent Notes

AI Agent wajib:

- Menggunakan Admin Layout.
- Menggunakan React + TypeScript.
- Menggunakan Tailwind CSS.
- Menggunakan reusable component.
- Menggunakan Dummy Data.
- Tidak membuat API Call.
- Mengikuti Design System.
- Mengikuti Coding Guidelines.
