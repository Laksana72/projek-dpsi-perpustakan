# Component Specification
Version : 2.0

Project

UAD Library Management System

Platform

Web Application

Framework

React + TypeScript + Tailwind CSS

---

# Overview

Seluruh komponen harus reusable.

Tidak boleh membuat komponen yang sama lebih dari satu kali.

Gunakan Composition Pattern.

Gunakan TypeScript.

Gunakan Tailwind CSS.

Tidak menggunakan inline style.

Semua komponen berada pada folder:

src/components/

---

# Navbar

Digunakan pada:

Landing Page

Koleksi

Tentang

Bantuan

Height

88px

Position

Absolute pada Landing

Sticky pada halaman lain

Background

Transparent

↓

Scroll menjadi White

Layout

Logo

↓

Navigation

↓

Login Button

Navigation

Beranda

Koleksi

Tentang

Bantuan

Button

Masuk

Hover

Underline

Color berubah Primary

Transition

300ms

---

# Sidebar

Digunakan pada User dan Admin.

Width

280px

Height

100vh

Background

Primary Dark

Logo berada di atas.

Menu berada di tengah.

Logout berada di bawah.

Menu Height

48px

Menu Radius

12px

Active

Background Primary

Hover

Background sedikit lebih terang.

---

# Header

Height

72px

Background

White

Shadow

Small

Layout

Page Title

↓

Notification

↓

Profile

Header selalu sticky.

---

# Hero

Background

Gedung UAD

Overlay

Gradient Biru

Height

720px

Layout

Left Content

↓

Right Empty

Isi

Heading

Subtitle

Search

Feature

---

# Search Bar

Height

72px

Radius

18px

Background

White

Shadow

Large

Komponen

Search Icon

↓

Input

↓

Button Cari

Placeholder

Cari buku berdasarkan judul, penulis atau kategori...

Button

Primary

---

# Button

Jenis

Primary

Secondary

Outline

Danger

Success

Ukuran

Small

Medium

Large

Radius

10px

Transition

300ms

Disabled

Opacity 50%

Cursor

not-allowed

---

# Input

Height

48px

Radius

12px

Border

Gray 300

Focus

Blue 700

Placeholder

Gray 500

Label berada di atas.

---

# Select

Menggunakan style sama dengan Input.

Arrow berada di kanan.

Radius

12px

---

# Card

Background

White

Radius

20px

Padding

24px

Shadow

Medium

Hover

Shadow Large

TranslateY

-4px

---

# Feature Card

Berisi

Icon

↓

Title

↓

Description

Layout

Vertical

Center

---

# Book Card

Lebar

100%

Cover

160 x 240

Radius

16px

Isi

Cover

↓

Judul

↓

Penulis

↓

Kategori

↓

Status

↓

Button Detail

Hover

Naik 4px

---

# Statistic Card

Layout

Icon

↓

Value

↓

Label

↓

Persentase

Radius

20px

---

# Table

Header

Blue 900

Text

White

Row Height

60px

Hover

Gray 100

Radius

16px

Pagination berada di bawah.

---

# Badge

Radius

999px

Padding

6px 12px

Available

Hijau

Borrowed

Biru

Late

Merah

Reserved

Orange

Lost

Gray

---

# Pagination

Layout

Previous

↓

Number

↓

Next

Button Radius

10px

Active

Primary

---

# Modal

Radius

24px

Padding

32px

Background

White

Overlay

Black

Opacity

40%

---

# Toast

Position

Top Right

Radius

16px

Shadow

Medium

Duration

3000ms

Jenis

Success

Warning

Info

Error

---

# Empty State

Layout

Center

Illustration

↓

Title

↓

Description

↓

Button

---

# Error State

Layout

Center

Error Icon

↓

Title

↓

Description

↓

Retry Button

---

# Loading

Gunakan Skeleton.

Tidak menggunakan Spinner untuk satu halaman penuh.

Skeleton harus mengikuti bentuk komponen.

---

# Footer

Background

Blue 900

Padding

64px

Layout

5 Kolom

Kolom

Logo

Navigasi

Layanan

Informasi

Ikuti Kami

Copyright

berada di bawah.

---

# Avatar

Shape

Circle

Ukuran

32

40

48

64

Border

White

---

# Breadcrumb

Format

Home

/

Halaman

/

Detail

Separator

Chevron Right

---

# Notification Bell

Icon

Bell

Badge merah jika ada notifikasi.

Klik

Dropdown.

---

# Dropdown

Radius

16px

Shadow

Medium

Padding

12px

Animation

Fade

---

# AI Rules

AI wajib menggunakan komponen reusable.

Tidak boleh membuat komponen baru jika sudah tersedia.

Tidak boleh menduplikasi Button.

Tidak boleh menduplikasi Card.

Tidak boleh menduplikasi Search.

Tidak boleh menduplikasi Modal.

Tidak boleh mengubah ukuran komponen tanpa memperbarui Design System.

Semua halaman wajib menggunakan komponen dari folder src/components/.

Jika membutuhkan komponen baru, buat reusable terlebih dahulu sebelum digunakan.