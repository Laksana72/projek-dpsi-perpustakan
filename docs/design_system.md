# Design System
Version : 2.0

Project

UAD Library Management System

Platform

Web Application

Framework

React + TypeScript + Tailwind CSS

---

# Design Principle

Seluruh antarmuka harus mengikuti prinsip berikut.

Modern

Minimalist

Professional

Clean

Consistent

Accessible

Responsive

Academic

Simple

Readable

Friendly

Tidak diperbolehkan menggunakan gaya UI yang berbeda pada halaman lain.

---

# Design Goal

UI harus memiliki karakter.

Modern University

Professional Library

Simple Navigation

Clean Dashboard

Comfort Reading

Soft Color

Large White Space

Large Border Radius

Smooth Shadow

Smooth Transition

---

# Layout Width

Desktop

1440px

Container

1320px

Laptop

1200px

Tablet

768px

Mobile

390px

Container selalu berada di tengah.

Gunakan

mx-auto

---

# Grid System

Desktop

12 Column

Laptop

12 Column

Tablet

8 Column

Mobile

4 Column

Gunakan CSS Grid.

---

# Spacing Scale

Gunakan hanya nilai berikut.

4px

8px

12px

16px

20px

24px

32px

40px

48px

64px

80px

96px

120px

Tidak menggunakan spacing lain.

---

# Border Radius

Small

8px

Medium

12px

Large

16px

Extra Large

20px

Card

20px

Search

18px

Modal

24px

Avatar

9999px

---

# Shadow

Small

0 2px 6px rgba(0,0,0,.06)

Medium

0 6px 18px rgba(0,0,0,.08)

Large

0 10px 30px rgba(0,0,0,.10)

Hero Search

0 12px 35px rgba(0,0,0,.15)

Hover Card

0 14px 35px rgba(0,0,0,.12)

Tidak menggunakan shadow hitam pekat.

---

# Color Palette

## Primary

Blue 900

#071B47

Blue 800

#123C8A

Blue 700

#2563EB

Blue 600

#3B82F6

Blue 500

#60A5FA

---

## Neutral

White

#FFFFFF

Background

#F8FAFC

Gray 100

#F1F5F9

Gray 200

#E2E8F0

Gray 300

#CBD5E1

Gray 500

#64748B

Gray 700

#334155

Gray 900

#0F172A

---

## Success

#22C55E

---

## Warning

#F59E0B

---

## Error

#EF4444

---

## Info

#3B82F6

---

# Typography

Gunakan hanya

Poppins

Fallback

sans-serif

---

# Font Weight

Regular

400

Medium

500

Semi Bold

600

Bold

700

---

# Heading

Hero

64px

72px

700

---

H1

48px

700

---

H2

40px

700

---

H3

32px

600

---

H4

28px

600

---

H5

24px

600

---

H6

20px

600

---

# Body

Large

20px

Regular

---

Body

16px

Regular

---

Small

14px

Regular

---

Caption

12px

Regular

---

# Button

Height

44px

Radius

10px

Padding Horizontal

24px

Transition

300ms

---

## Primary Button

Background

Blue 700

Text

White

Hover

Blue 800

Disabled

Gray 300

---

## Secondary Button

Background

White

Border

Blue 700

Text

Blue 700

Hover

Blue 50

---

## Outline Button

Transparent

Border

White

Text

White

Hover

White

Text Blue

---

# Input

Height

48px

Radius

12px

Padding

16px

Border

Gray 300

Focus

Blue 700

Placeholder

Gray 500

---

# Search Box

Height

72px

Radius

18px

Background

White

Shadow

Hero Shadow

Button di sisi kanan.

---

# Navbar

Height

88px

Position

Absolute pada Landing Page

Sticky pada halaman dalam.

Background

Transparent

Setelah scroll

White

Shadow

Medium

---

# Sidebar

Width

280px

Background

Blue 900

Text

White

Radius

0

Menu Height

48px

Active

Blue 700

Hover

Blue 800

---

# Header

Height

72px

Background

White

Shadow

Small

Sticky

Yes

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

Large Shadow

TranslateY

-4px

Transition

300ms

---

# Book Card

Cover

160 x 240

Radius

16px

Judul

16px

Semi Bold

Penulis

14px

Status Badge

Di bawah cover.

---

# Statistic Card

Icon

48px

Value

32px

Label

14px

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

Border

Gray 200

Radius

16px

---

# Badge

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

Radius

999px

Padding

6px 12px

---

# Modal

Radius

24px

Background

White

Padding

32px

Shadow

Large

---

# Footer

Background

Blue 900

Text

White

Padding

64px

Layout

5 Column

---

# Icon

Gunakan

Lucide React

Ukuran

20

24

32

48

---

# Animation

Transition

300ms

Ease

ease-in-out

Hover Button

Scale

1.02

Hover Card

TranslateY(-4px)

Fade

Opacity

0 → 1

Duration

300ms

---

# Responsive

Desktop

1440px

Laptop

1280px

Tablet

768px

Mobile

390px

Sidebar berubah menjadi Drawer pada Tablet dan Mobile.

Table berubah menjadi Card List pada Mobile.

Navbar berubah menjadi Hamburger pada Mobile.

---

# Accessibility

Gunakan Semantic HTML.

Gunakan aria-label.

Semua Button dapat diakses keyboard.

Input memiliki placeholder.

Image memiliki alt.

Kontras warna minimal WCAG AA.

---

# Reusable Component

Seluruh komponen wajib reusable.

Tidak boleh duplicate.

Gunakan Composition Pattern.

---

# AI Rules

AI wajib mengikuti Design System ini.

Tidak boleh membuat warna baru.

Tidak boleh membuat font baru.

Tidak boleh membuat radius baru.

Tidak boleh membuat shadow baru.

Tidak boleh membuat ukuran baru.

Gunakan seluruh design token yang ada pada dokumen ini.

Jika terdapat konflik, gunakan nilai pada Design System sebagai acuan utama.
