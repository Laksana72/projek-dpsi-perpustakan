# Information Architecture

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Overview

Dokumen ini menjelaskan struktur informasi (Information Architecture) dari aplikasi Library Management System.

Tujuan utama dokumen ini adalah memastikan seluruh halaman, navigasi, dan hubungan antar halaman memiliki struktur yang konsisten selama proses pengembangan Frontend.

Information Architecture menjadi acuan utama AI Agent dalam membangun struktur routing dan layout aplikasi.

---

# 2. Application Structure

Aplikasi dibagi menjadi tiga area utama.

- Guest Area
- User Area
- Admin Area

Setiap area memiliki layout, navigasi, dan hak akses yang berbeda.

---

# 3. Sitemap

```

Library Management System

│

├── Landing Page

│ ├── Home

│ ├── Book Collection

│ ├── About

│ ├── Help

│ └── Login

│

├── User

│ ├── Dashboard

│ ├── Book Catalog

│ ├── Book Detail

│ ├── Borrowings

│ ├── History

│ ├── Fine

│ ├── Profile

│ └── Logout

│

└── Admin

├── Dashboard

├── Manage Books

├── Borrowings

├── Returns

├── History

├── Profile

└── Logout
