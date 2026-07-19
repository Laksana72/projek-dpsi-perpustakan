# Tech Stack

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Overview

Dokumen ini menjelaskan seluruh teknologi, framework, library, dan tools yang digunakan dalam pengembangan Frontend Library Management System.

Seluruh implementasi harus menggunakan teknologi yang telah ditentukan pada dokumen ini.

AI Agent tidak diperbolehkan mengganti framework atau library tanpa adanya revisi dokumentasi.

---

# 2. Core Technology

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19+ | Frontend Framework |
| TypeScript | Latest Stable | Bahasa Pemrograman |
| Vite | Latest Stable | Build Tool |
| Node.js | LTS | Runtime Development |

---

# 3. UI Framework

Framework utama:

React

Library styling:

Tailwind CSS

Component Library:

shadcn/ui

Icon Library:

Lucide React

Animation:

Framer Motion

---

# 4. Styling

Menggunakan:

- Tailwind CSS

Tidak menggunakan:

- Bootstrap
- Material UI
- Bulma
- Foundation

Apabila membutuhkan komponen tambahan, gunakan shadcn/ui terlebih dahulu.

---

# 5. Routing

Library

React Router DOM

Digunakan untuk:

- Public Route
- Protected Route
- Nested Route
- Layout Route

---

# 6. Form Handling

Library

React Hook Form

Validation

Zod

Semua form wajib menggunakan kombinasi tersebut.

---

# 7. State Management

State Lokal

useState

State Bersama

React Context

Custom Logic

Custom Hooks

Belum menggunakan Redux karena kebutuhan proyek frontend masih sederhana.

---

# 8. HTTP Client

Tahap saat ini:

Dummy Data

Tahap Integrasi Backend:

Axios

Seluruh request API nantinya ditempatkan pada folder:

src/services

---

# 9. Dummy Data

Folder

src/data

Contoh:

books.ts

users.ts

borrowings.ts

returns.ts

dashboard.ts

notifications.ts

---

# 10. Utility Libraries

Date Formatting

date-fns

Class Management

clsx

Tailwind Merge

tailwind-merge

---

# 11. Charts

Library

Recharts

Digunakan pada:

Dashboard Admin

Dashboard User

---

# 12. Table

Menggunakan:

shadcn/ui Table

Apabila membutuhkan fitur lanjutan dapat menggunakan TanStack Table.

---

# 13. Notification

Menggunakan:

Sonner

Jenis notifikasi:

- Success
- Error
- Warning
- Info

---

# 14. Loading

Menggunakan:

Skeleton Component

Tidak menggunakan spinner sebagai loading utama.

---

# 15. Folder Structure

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

---

# 16. Development Tools

Package Manager

npm

Code Editor

Visual Studio Code

Version Control

Git

Repository

GitHub

---

# 17. Code Quality

Formatter

Prettier

Linter

ESLint

Type Checking

TypeScript

---

# 18. Browser Support

Google Chrome

Microsoft Edge

Mozilla Firefox

Safari

Versi modern yang masih mendapatkan pembaruan.

---

# 19. Responsive Target

Desktop

≥1280 px

Laptop

1024 px

Tablet

768 px

Mobile

390 px

Desktop menjadi prioritas utama.

---

# 20. Build Target

Development

npm run dev

Production

npm run build

Preview

npm run preview

---

# 21. Performance Target

Initial Load

< 3 detik

Lighthouse Performance

≥ 90

Accessibility

≥ 90

Best Practices

≥ 90

SEO

≥ 80

---

# 22. Security

Frontend tidak menyimpan password.

Token autentikasi akan dikelola Backend.

Seluruh komunikasi API menggunakan HTTPS pada tahap integrasi.

---

# 23. Future Integration

Ketika Backend selesai, aplikasi akan menggunakan:

- REST API
- Axios
- JWT Authentication
- Protected Route
- Role-Based Access

Perubahan hanya terjadi pada layer services tanpa mengubah tampilan UI.

---

# 24. Dependencies

Dependencies utama yang digunakan:

- react
- react-dom
- react-router-dom
- typescript
- vite
- tailwindcss
- shadcn/ui
- lucide-react
- react-hook-form
- zod
- @hookform/resolvers
- axios
- clsx
- tailwind-merge
- date-fns
- sonner
- framer-motion
- recharts

---

# 25. AI Agent Rules

AI Agent wajib:

- Menggunakan React + TypeScript.
- Menggunakan Vite sebagai build tool.
- Menggunakan Tailwind CSS untuk styling.
- Menggunakan shadcn/ui sebagai component library.
- Menggunakan React Router untuk navigasi.
- Menggunakan React Hook Form + Zod untuk seluruh form.
- Menggunakan Dummy Data selama pengembangan frontend.
- Tidak menambahkan library lain tanpa kebutuhan yang jelas.
- Menjaga konsistensi dengan seluruh dokumen pada folder docs/.
