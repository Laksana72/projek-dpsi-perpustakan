# Interaction
Version : 2.0

Project

UAD Library Management System

Platform

Web Application

---

# Overview

Seluruh interaksi harus sederhana.

Natural.

Professional.

Tidak berlebihan.

Seluruh animasi maksimal 300ms.

---

# Cursor

Button

Pointer

---

Link

Pointer

---

Card

Pointer jika dapat diklik.

---

Input

Text Cursor.

---

# Hover

Button

Background berubah.

Shadow bertambah.

Transition 300ms.

---

Card

Naik 4px.

Shadow lebih besar.

---

Navbar Menu

Underline muncul.

Warna berubah menjadi Primary.

---

Sidebar Menu

Background berubah.

Icon berubah menjadi putih.

---

Book Card

Scale

1.02

Shadow bertambah.

---

Table Row

Background

Gray 100.

---

# Active

Button

Sedikit lebih gelap.

---

Sidebar

Background Primary.

Text Putih.

---

Navbar

Underline.

---

# Focus

Input

Border Primary.

Ring Primary.

---

Button

Focus Ring.

---

Search

Border Primary.

---

# Click

Button

Ripple ringan (opsional).

Loading jika proses berlangsung.

---

Book Card

↓

Detail Buku

---

Logo

↓

Landing

---

# Search

Realtime Search.

Tidak memerlukan tombol Enter.

Filter dilakukan saat pengguna mengetik.

Debounce sekitar 300 ms (opsional).

---

# Filter

Perubahan filter langsung memperbarui data.

Tidak perlu tombol Submit.

Tombol Reset mengembalikan kondisi awal.

---

# Pagination

Klik nomor halaman.

↓

Data berubah.

Tidak melakukan reload halaman.

---

# Modal

Open

Fade In.

Scale 95% → 100%.

---

Close

Fade Out.

---

Klik Overlay

↓

Modal tertutup.

---

ESC

↓

Modal tertutup.

---

# Dropdown

Fade.

Slide Down.

Klik luar area

↓

Dropdown tertutup.

---

# Toast

Muncul

Top Right.

Fade In.

↓

3 detik.

↓

Fade Out.

---

# Loading

Gunakan Skeleton.

Tidak menggunakan spinner untuk seluruh halaman.

Loading harus menyerupai bentuk konten.

---

# Empty State

Icon.

↓

Title.

↓

Description.

↓

Button Refresh.

---

# Error State

Icon.

↓

Title.

↓

Description.

↓

Retry Button.

---

# Form Validation

Validasi dilakukan saat Submit.

Field salah.

↓

Border Merah.

↓

Pesan Error.

---

Field benar.

↓

Border Hijau (opsional).

---

# Login Interaction

Klik Login.

↓

Loading.

↓

Jika berhasil.

Dashboard.

↓

Jika gagal.

Toast Error.

---

# Logout Interaction

Klik Logout.

↓

Modal Konfirmasi.

↓

Ya.

Landing Page.

↓

Tidak.

Modal ditutup.

---

# Responsive Interaction

Tablet

Sidebar menjadi Drawer.

---

Mobile

Navbar menjadi Hamburger.

Table menjadi Card List.

Button Full Width.

---

# Animation

Duration

300ms.

Ease

ease-in-out.

Hover.

Fade.

Slide.

Scale.

Tidak menggunakan animasi yang mengganggu.

---

# Accessibility

Semua komponen dapat diakses keyboard.

Tab Order harus logis.

Enter mengaktifkan Button.

Space mengaktifkan Checkbox.

Esc menutup Modal.

Alt diberikan pada seluruh gambar.

ARIA Label diberikan pada Button, Input, Search, dan Icon Button.

---

# AI Rules

AI wajib mengikuti seluruh interaction yang didefinisikan.

Tidak menambahkan animasi baru.

Tidak menggunakan animasi lebih dari 300ms.

Tidak mengubah perilaku komponen tanpa memperbarui dokumen ini.

Semua interaksi harus konsisten pada seluruh halaman aplikasi.