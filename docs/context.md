# Context
Version: 2.0

Project Name:
UAD Library Management System

Platform:
Web Application

Project Type:
Frontend Only

Framework:
React + TypeScript + Vite + Tailwind CSS

Status:
Development

---

# Project Overview

UAD Library Management System merupakan aplikasi perpustakaan berbasis web yang digunakan oleh civitas akademika Universitas Ahmad Dahlan untuk mengakses layanan perpustakaan secara digital.

Project ini hanya berfokus pada pengembangan Frontend. Backend akan dikembangkan oleh tim lain sehingga seluruh data selama proses development menggunakan Dummy Data.

Seluruh implementasi harus mengikuti dokumen pada folder docs sebagai Single Source of Truth (SoT).

AI Agent tidak diperbolehkan membuat asumsi di luar dokumentasi.

---

# Project Goal

Membangun website perpustakaan modern yang:

- Responsive
- Mudah digunakan
- Cepat
- Konsisten
- Professional
- Pixel Perfect mengikuti desain

Target implementasi visual minimal 95% sesuai desain referensi.

---

# Scope

Project hanya mencakup Frontend.

Tidak mencakup:

- Backend
- Database
- API
- Authentication Server
- Payment
- Email
- Notification Server

Seluruh data menggunakan Dummy Data.

---

# User Role

Guest

Belum Login.

Dapat mengakses:

Landing Page

Koleksi

Tentang

Bantuan

Login

---

User

Sudah Login.

Dapat mengakses:

Dashboard

Katalog Buku

Detail Buku

Peminjaman

Riwayat

Profil

Logout

---

Administrator

Sudah Login.

Dapat mengakses:

Dashboard Admin

Kelola Buku

Pengembalian

Riwayat

Profil

Logout

---

# Design Vision

Website harus memiliki kesan:

Modern

Minimalis

Professional

Elegant

Clean

Academic

Simple

Friendly

Tidak boleh terlihat seperti dashboard template gratis.

---

# UI Style

Menggunakan gaya modern.

Dominan warna biru tua.

Menggunakan banyak white space.

Card memiliki radius besar.

Shadow halus.

Transisi lembut.

Hover sederhana.

Tidak menggunakan animasi berlebihan.

---

# Visual Identity

Menggunakan identitas visual Universitas Ahmad Dahlan.

Logo berada pada navbar dan footer.

Menggunakan background Gedung Kampus UAD pada Hero Section.

Background tidak boleh blur berlebihan.

Gunakan overlay biru transparan agar teks tetap terbaca.

---

# Landing Page Structure

Landing Page terdiri dari:

Navbar

Hero Section

Search Section

Feature Information

Keunggulan

Call To Action

Footer

Urutan section tidak boleh diubah.

Tidak boleh menambah section baru.

Tidak boleh menghapus section.

---

# Hero Section

Hero merupakan fokus utama halaman.

Tinggi hero sekitar 720px.

Background menggunakan foto Gedung UAD.

Overlay menggunakan gradasi biru gelap.

Hero memiliki:

Heading

Sub Heading

Search Bar

Feature Information

Heading berada di sisi kiri.

Tidak menggunakan gambar tambahan selain background.

---

# Search Section

Search berada di dalam Hero.

Search memiliki:

Input

Button Cari

Radius besar.

Shadow lembut.

Tidak menggunakan border tebal.

---

# Feature Information

Empat informasi.

Koleksi Lengkap

Reservasi Online

Notifikasi Pintar

Akses Kapan Saja

Menggunakan icon outline.

Layout horizontal.

---

# Keunggulan

Background putih.

Radius besar.

Empat kolom.

Setiap kolom memiliki:

Icon

Title

Description

---

# CTA

Background biru tua.

Radius besar.

Berisi:

Title

Subtitle

Tidak menggunakan tombol.

---

# Footer

Footer terdiri dari lima kolom.

Logo

Navigasi

Layanan

Informasi

Ikuti Kami

Footer menggunakan warna biru gelap.

---

# Navigation

Guest

Beranda

Koleksi

Tentang

Bantuan

Masuk

---

User

Dashboard

Katalog Buku

Peminjaman

Riwayat

Profil

Logout

---

Admin

Dashboard

Kelola Buku

Pengembalian

Riwayat

Profil

Logout

---

# Responsive Rules

Desktop

1440px

Laptop

1280px

Tablet

768px

Mobile

390px

Layout harus berubah secara proporsional.

Tidak boleh overflow.

Tidak boleh ada horizontal scroll.

---

# Component Philosophy

Semua komponen harus reusable.

Tidak boleh duplicate component.

Gunakan composition.

Pisahkan logic dan UI.

---

# Dummy Data

Seluruh data berasal dari folder:

src/data/

Tidak boleh menggunakan API.

Tidak boleh menggunakan Backend.

---

# Accessibility

Gunakan semantic HTML.

Gunakan aria-label.

Button dapat diakses keyboard.

Input memiliki placeholder.

Image memiliki alt.

---

# Animation

Hover Button

Hover Card

Fade In

Transition

Durasi maksimal:

300ms

Tidak menggunakan animasi berlebihan.

---

# Performance

Gunakan Lazy Loading.

Gunakan React Lazy.

Gunakan Suspense.

Optimalkan render.

---

# AI Agent Rules

AI Agent WAJIB membaca seluruh folder docs sebelum membuat kode.

AI Agent tidak boleh membuat asumsi.

AI Agent tidak boleh mengubah struktur project.

AI Agent tidak boleh membuat halaman baru tanpa dokumentasi.

AI Agent wajib mengikuti Design System.

AI Agent wajib mengikuti Layout Specification.

AI Agent wajib mengikuti Component Specification.

Jika terdapat konflik dokumentasi maka prioritas:

1. context.md
2. layout_specification.md
3. design_system.md
4. component_specification.md
5. halaman pada folder pages

---

# Pixel Perfect Rules

Target implementasi minimal 95% sama dengan desain.

Tidak boleh mengubah:

Ukuran Hero

Ukuran Navbar

Posisi Search

Urutan Section

Typography

Spacing

Color

Border Radius

Shadow

Icon

Alignment

Layout

Grid

Padding

Margin

Tanpa persetujuan dokumentasi.

---

# Coding Rules

Gunakan:

React

TypeScript

Tailwind CSS

Functional Component

Hooks

Reusable Component

Strict TypeScript

Tidak boleh menggunakan inline CSS.

Tidak boleh hardcode warna.

Tidak boleh hardcode ukuran.

Gunakan design token.

---

# Development Rules

Setiap halaman dibuat berdasarkan file pada:

docs/pages/

Tidak boleh melewati sprint.

Setiap sprint wajib mengupdate:

project_state.md

---

# Final Goal

Frontend selesai 100%.

Responsive.

Pixel Perfect.

Reusable.

Clean Code.

Ready untuk integrasi Backend tanpa mengubah UI.
