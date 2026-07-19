# Layout Specification
Version : 2.0

Project

UAD Library Management System

Platform

Web Application

Framework

React + TypeScript + Tailwind CSS

---

# Overview

Dokumen ini mendefinisikan struktur layout seluruh halaman aplikasi.

Seluruh halaman WAJIB mengikuti layout yang dijelaskan.

AI tidak diperbolehkan mengubah urutan section.

AI tidak diperbolehkan menambah section baru.

AI tidak diperbolehkan menghapus section.

Layout harus responsive.

Layout harus pixel-perfect mengikuti desain.

---

# Global Container

Desktop

Max Width

1320px

Margin

Auto

Padding Horizontal

32px

---

Laptop

Max Width

1140px

Padding

24px

---

Tablet

100%

Padding

20px

---

Mobile

100%

Padding

16px

---

# Global Section

Jarak antar section

80px

Padding atas

80px

Padding bawah

80px

Landing Page memiliki white space yang luas.

---

# Guest Layout

Guest Layout digunakan untuk halaman:

Landing

Koleksi

Tentang

Bantuan

Login

Struktur

Navbar

↓

Main Content

↓

Footer

Tidak menggunakan Sidebar.

---

# User Layout

Digunakan untuk:

Dashboard

Katalog

Detail Buku

Peminjaman

Riwayat

Profil

Layout

Sidebar

↓

Header

↓

Content

Sidebar tetap berada di kiri.

Header berada di atas.

Content berada di kanan.

---

# Admin Layout

Digunakan untuk:

Dashboard Admin

Kelola Buku

Pengembalian

Layout

Sidebar

↓

Header

↓

Content

Sidebar Admin berbeda menu dengan User.

---

# Landing Page Layout

Landing Page terdiri dari.

Navbar

↓

Hero

↓

Feature

↓

Keunggulan

↓

CTA

↓

Footer

Urutan tidak boleh diubah.

---

# Navbar

Position

Absolute

Top

0

Left

0

Right

0

Height

88px

Container

1320px

Layout

Logo

↓

Navigation

↓

Login Button

Logo di kiri.

Navigation berada di tengah.

Button Masuk berada di kanan.

Background

Transparent.

Saat scroll

Background berubah menjadi putih.

Navbar memiliki shadow tipis.

---

# Hero

Height

720px

Width

100%

Background

Foto Gedung Universitas Ahmad Dahlan.

Background Size

Cover

Background Position

Center

Overlay

Linear Gradient

Warna

Blue 900

Opacity

75%

Hero terdiri dari dua bagian.

Kolom kiri

Heading

Subtitle

Search

Feature

Kolom kanan

Kosong

Tidak menggunakan ilustrasi tambahan.

---

# Hero Heading

Lebar maksimum

620px

Judul

64px

Bold

Putih

Subtitle

20px

Regular

Putih

Jarak heading ke subtitle

24px

---

# Search Box

Lebar

720px

Tinggi

72px

Radius

18px

Shadow

Large

Komponen

Input

↓

Button Cari

Button berada di sisi kanan.

---

# Feature Row

Berada di bawah Search.

Empat Item.

Layout

Horizontal

Gap

48px

Setiap item memiliki.

Icon

↓

Title

↓

Description singkat.

---

# Keunggulan

Container

1320px

Background

White

Radius

20px

Padding

48px

Empat Card.

Layout

4 Column

Desktop

2 Column

Tablet

1 Column

Mobile

---

# CTA

Background

Blue 900

Radius

20px

Padding

48px

Layout

Center

Title

↓

Subtitle

Tidak memiliki tombol.

---

# Footer

Background

Blue 900

Padding

64px

Radius bawah

20px

Layout

5 Column

Kolom.

Logo

Navigasi

Layanan

Informasi

Ikuti Kami

---

# Login Page

Layout

Center Screen

Card Login

Width

460px

Background

White

Radius

20px

Padding

40px

Shadow

Large

Isi.

Logo

↓

Title

↓

Subtitle

↓

Email

↓

Password

↓

Remember Me

↓

Login Button

↓

Register Link

---

# Dashboard User

Layout

Sidebar

↓

Header

↓

Dashboard Content

Header

72px

Sidebar

280px

Content menggunakan Grid.

---

# Dashboard Admin

Layout

Sidebar

↓

Header

↓

Summary Card

↓

Quick Action

↓

Activity

↓

Table

↓

Book Status

↓

Top Borrowed

---

# Katalog Buku

Header

↓

Search

↓

Filter

↓

Book Grid

↓

Pagination

Grid

Desktop

4 Kolom

Laptop

3 Kolom

Tablet

2 Kolom

Mobile

1 Kolom

---

# Detail Buku

Layout

2 Column

Desktop

Cover Buku

↓

Informasi

Tablet

1 Column

Mobile

1 Column

Button berada di bawah informasi.

---

# Peminjaman

Header

↓

Summary

↓

Search

↓

Table

↓

Pagination

---

# Pengembalian

Header

↓

Summary

↓

Search

↓

Filter

↓

Table

↓

Pagination

---

# Riwayat

Header

↓

Filter

↓

Table

↓

Pagination

---

# Profil

Layout

2 Column

Desktop

Avatar

↓

Informasi

↓

Edit Profil

Tablet

1 Column

---

# Empty State

Layout

Center

Icon

↓

Title

↓

Description

↓

Button

---

# Loading State

Gunakan Skeleton.

Jangan menggunakan spinner untuk seluruh halaman.

---

# Error State

Center Layout.

Icon

↓

Title

↓

Description

↓

Retry Button

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

---

# Tablet Behaviour

Sidebar berubah menjadi Drawer.

Grid berubah menjadi 2 kolom.

Table dapat di-scroll horizontal.

---

# Mobile Behaviour

Sidebar menjadi Hamburger.

Navbar menjadi Collapse.

Table berubah menjadi Card List.

Grid menjadi 1 kolom.

Button menjadi Full Width.

Search menjadi Vertical.

---

# Layout Rules

Gunakan Flexbox dan CSS Grid.

Tidak menggunakan Position Absolute kecuali:

Navbar Landing

Overlay Hero

Floating Button

Modal

Dropdown

---

# Alignment Rules

Semua section harus sejajar menggunakan Container.

Tidak boleh ada komponen yang keluar dari Container.

---

# AI Layout Rules

AI wajib mengikuti Layout Specification.

Tidak boleh mengubah urutan section.

Tidak boleh mengubah tinggi Hero.

Tidak boleh mengubah ukuran Navbar.

Tidak boleh mengubah posisi Search.

Tidak boleh mengubah Footer.

Tidak boleh mengubah Layout Dashboard.

Landing Page hanya menggunakan Guest Layout.

Dashboard User hanya menggunakan User Layout.

Dashboard Admin hanya menggunakan Admin Layout.

Jika terjadi konflik dengan file lain, Layout Specification menjadi acuan utama untuk struktur halaman.
