# Pages Index

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Overview

Dokumen ini berisi daftar seluruh halaman (Pages) yang terdapat pada aplikasi Library Management System Frontend.

Setiap halaman memiliki dokumen spesifikasi tersendiri pada folder `docs/pages/`.

AI Agent wajib membaca dokumen ini terlebih dahulu sebelum membaca spesifikasi masing-masing halaman.

---

# 2. Page Groups

Aplikasi dibagi menjadi tiga kelompok halaman.

1. Guest Pages
2. User Pages
3. Admin Pages

---

# 3. Guest Pages

Halaman yang dapat diakses tanpa login.

| No | Page | File |
|----|------|------|
| 1 | Landing Page | landing_page.md |
| 2 | Login | login.md |

---

# 4. User Pages

Halaman yang dapat diakses setelah pengguna berhasil login sebagai User.

| No | Page | File |
|----|------|------|
| 1 | Dashboard User | dashboard_user.md |
| 2 | Katalog Buku | katalog_buku.md |
| 3 | Detail Buku | detail_buku.md |
| 4 | Peminjaman Saya | peminjaman.md |
| 5 | Riwayat Peminjaman | riwayat.md |
| 6 | Profil | profil.md |
| 7 | Logout Modal | logout_modal.md |

---

# 5. Admin Pages

Halaman yang dapat diakses setelah login sebagai Admin.

| No | Page | File |
|----|------|------|
| 1 | Dashboard Admin | dashboard_admin.md |
| 2 | Pengembalian Buku | pengembalian.md |

Catatan:

Fitur pengelolaan buku dan peminjaman admin dijelaskan pada dokumen `dashboard_admin.md` sesuai ruang lingkup frontend proyek.

---

# 6. Navigation Flow

Guest

Landing Page

↓

Login

↓

Dashboard User

---

User

Dashboard

↓

Katalog Buku

↓

Detail Buku

↓

Peminjaman

↓

Riwayat

↓

Profil

↓

Logout

---

Admin

Dashboard

↓

Kelola Buku

↓

Data Peminjaman

↓

Data Pengembalian

↓

Profil

↓

Logout

---

# 7. Page Dependency

Landing Page

↓

Login

↓

Dashboard

↓

Seluruh halaman User

Dashboard Admin berdiri sendiri setelah Admin Login.

---

# 8. Common Layout

Guest Pages menggunakan:

- Guest Layout
- Navbar
- Footer

---

User Pages menggunakan:

- User Layout
- Sidebar
- Header
- Main Content

---

Admin Pages menggunakan:

- Admin Layout
- Sidebar
- Header
- Main Content

---

# 9. Shared Components

Seluruh halaman menggunakan komponen yang telah didefinisikan pada:

- component_specification.md
- layout_specification.md
- design_system.md

Komponen yang digunakan meliputi:

- Button
- Input
- Search
- Badge
- Card
- Modal
- Data Table
- Pagination
- Avatar
- Skeleton
- Empty State
- Error State

---

# 10. Responsive Rules

Semua halaman wajib mendukung:

Desktop

≥1280 px

Laptop

1024 px

Tablet

768 px

Mobile

390 px

Sidebar berubah menjadi Drawer pada Tablet dan Mobile.

Grid otomatis menyesuaikan ukuran layar.

---

# 11. Dummy Data

Seluruh halaman menggunakan Dummy Data.

Data berasal dari folder:

src/data/

Backend belum digunakan pada tahap ini.

---

# 12. Design Reference

Seluruh tampilan halaman harus mengikuti:

- Design System
- Layout Specification
- Component Specification
- Navigation
- Interaction

AI Agent tidak diperbolehkan mengubah struktur halaman tanpa pembaruan dokumentasi.

---

# 13. AI Agent Workflow

Sebelum membuat sebuah halaman, AI Agent wajib:

1. Membaca index.md.
2. Menentukan halaman yang akan dibuat.
3. Membaca file spesifikasi halaman tersebut.
4. Membaca design_system.md.
5. Membaca component_specification.md.
6. Membaca layout_specification.md.
7. Menggunakan reusable components.
8. Mengikuti coding_guidelines.md.
9. Menggunakan Dummy Data.
10. Memastikan halaman responsive.

---

# 14. Implementation Order

AI Agent wajib mengimplementasikan halaman sesuai urutan berikut:

1. landing_page.md
2. login.md
3. dashboard_user.md
4. katalog_buku.md
5. detail_buku.md
6. peminjaman.md
7. riwayat.md
8. profil.md
9. logout_modal.md
10. dashboard_admin.md
11. pengembalian.md

---

# 15. Notes

- Seluruh halaman harus menggunakan React + TypeScript.
- Styling menggunakan Tailwind CSS.
- Komponen harus reusable.
- Tidak menggunakan data statis langsung di dalam halaman.
- Seluruh data berasal dari folder `src/data/`.
- UI harus mengikuti desain yang telah didefinisikan dalam dokumentasi proyek.
