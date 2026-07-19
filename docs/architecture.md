# Architecture

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Overview

Library Management System Frontend menggunakan arsitektur berbasis **Component-Based Architecture** dengan pendekatan **Feature-Based Folder Structure**.

Arsitektur ini dipilih agar aplikasi mudah dikembangkan, mudah dipelihara, serta mudah diintegrasikan dengan Backend pada tahap selanjutnya.

Seluruh halaman dibangun menggunakan React, TypeScript, dan Tailwind CSS.

---

# 2. Architecture Principles

Arsitektur aplikasi mengikuti prinsip berikut.

- Separation of Concerns
- Reusable Components
- Single Responsibility Principle
- Feature-Based Organization
- Component Composition
- Responsive Design
- Future API Ready

---

# 3. High Level Architecture

```

Browser

↓

React Application

↓

Layouts

↓

Pages

↓

Components

↓

Hooks

↓

Services

↓

Dummy Data

↓

Future REST API

```

---

# 4. Frontend Layers

Aplikasi dibagi menjadi beberapa layer.

Presentation Layer

Business Layer

Data Layer

Utility Layer

---

## Presentation Layer

Bertanggung jawab terhadap tampilan aplikasi.

Berisi:

- Layout
- Pages
- Components

---

## Business Layer

Berisi logic frontend.

Contoh:

- Custom Hooks
- Form Validation
- Navigation
- State Management

---

## Data Layer

Seluruh data berasal dari Dummy Data.

Nantinya dapat diganti menjadi REST API tanpa mengubah tampilan.

---

## Utility Layer

Berisi:

- Helper
- Constants
- Formatter
- Validator

---

# 5. Folder Structure

```

src/

assets/

components/

layouts/

pages/

routes/

hooks/

services/

data/

types/

utils/

constants/

styles/

```

---

# 6. Layout Architecture

Guest Layout

Landing

About

Help

Collection

Login

---

User Layout

Sidebar

Header

Content

Footer

---

Admin Layout

Sidebar

Header

Content

---

# 7. Component Architecture

Components dibagi menjadi beberapa kategori.

```

components/

common/

buttons/

cards/

forms/

layout/

navigation/

tables/

feedback/

modals/

charts/

```

Semua komponen wajib reusable.

---

# 8. Routing Architecture

Routing menggunakan React Router.

Guest

/

collection

about

help

login

---

User

/dashboard

/catalog

/book/:id

/borrowings

/history

/fine

/profile

---

Admin

/admin/dashboard

/admin/books

/admin/borrowings

/admin/returns

/admin/history

/admin/profile

---

# 9. State Management

Menggunakan React Context untuk state global sederhana.

State lokal menggunakan useState.

State kompleks dapat menggunakan custom hooks.

---

# 10. Data Flow

Dummy Data

↓

Services

↓

Hooks

↓

Pages

↓

Components

↓

User

Nantinya Dummy Data diganti menjadi REST API tanpa mengubah UI.

---

# 11. Reusable Component Rules

Semua Button menggunakan Button Component.

Semua Input menggunakan Input Component.

Semua Table menggunakan DataTable Component.

Semua Card menggunakan Card Component.

Tidak boleh membuat komponen yang sama lebih dari satu kali.

---

# 12. Responsive Architecture

Desktop menjadi prioritas.

Breakpoints:

Desktop ≥1280px

Laptop ≥1024px

Tablet ≥768px

Mobile <768px

Sidebar berubah menjadi Drawer pada Tablet dan Mobile.

---

# 13. Styling Architecture

Menggunakan Tailwind CSS.

Tidak menggunakan CSS inline.

Tidak menggunakan Bootstrap.

Tidak menggunakan CSS Framework lain.

---

# 14. Dummy Data Architecture

Folder

```

src/data/

```

Berisi

books.ts

users.ts

borrowings.ts

returns.ts

fines.ts

dashboard.ts

notifications.ts

---

# 15. Future Backend Integration

Semua service nantinya diganti menjadi pemanggilan REST API.

UI tidak boleh berubah.

Perubahan hanya terjadi pada folder services.

---

# 16. Error Handling

404 Page

Loading

Skeleton

Empty State

Error State

Retry Button

---

# 17. Security

Frontend tidak menyimpan password.

Tidak menyimpan token permanen.

Seluruh autentikasi akan ditangani Backend.

---

# 18. AI Agent Rules

AI Agent wajib:

- Mengikuti struktur folder.
- Membuat reusable component.
- Memisahkan business logic dari UI.
- Menggunakan TypeScript.
- Menggunakan Tailwind CSS.
- Menyiapkan struktur agar mudah diintegrasikan dengan Backend.
