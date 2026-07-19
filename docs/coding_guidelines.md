# Coding Guidelines

Project : Library Management System Frontend

Version : 1.0.0

Status : Approved

---

# 1. Purpose

Dokumen ini berisi standar penulisan kode (Coding Guidelines) untuk seluruh pengembangan Frontend Library Management System.

Tujuan utama dokumen ini adalah menjaga:

- Konsistensi kode
- Kemudahan maintenance
- Kualitas kode
- Reusability
- Scalability

Seluruh developer dan AI Agent wajib mengikuti aturan pada dokumen ini.

---

# 2. General Principles

Pengembangan harus mengikuti prinsip berikut:

- Clean Code
- Readable Code
- Reusable Component
- Single Responsibility Principle (SRP)
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple, Stupid)
- Separation of Concerns

---

# 3. Language

Gunakan:

- TypeScript

Tidak diperbolehkan menggunakan JavaScript biasa.

---

# 4. React Guidelines

Gunakan:

- Functional Component

Jangan menggunakan:

- Class Component

Contoh

Good

const LoginPage = () => {}

Bad

class LoginPage extends Component {}

---

# 5. File Naming

Gunakan PascalCase untuk:

- Component
- Layout
- Page

Contoh

LoginPage.tsx

DashboardPage.tsx

BookCard.tsx

Sidebar.tsx

---

Gunakan camelCase untuk:

- Variable
- Function
- Hooks

Contoh

bookList

handleSubmit

fetchBooks

---

Gunakan UPPER_CASE untuk:

Konstanta global.

Contoh

API_URL

DEFAULT_PAGE_SIZE

MAX_BOOK

---

# 6. Folder Structure

Setiap fitur memiliki struktur berikut.

feature/

components/

hooks/

types/

data/

utils/

---

# 7. Component Rules

Satu file hanya memiliki satu komponen utama.

Semua komponen harus reusable.

Komponen tidak boleh terlalu panjang.

Jika melebihi ±200 baris, pertimbangkan untuk memecah menjadi beberapa komponen.

---

# 8. Props Rules

Gunakan interface.

Contoh

interface BookCardProps {

title: string

author: string

}

Jangan menggunakan any.

---

# 9. State Management

State lokal

gunakan

useState

State global sederhana

gunakan

React Context

Logic yang digunakan berulang

gunakan

Custom Hook

---

# 10. Custom Hook

Semua custom hook diawali dengan:

use

Contoh

useAuth

useBooks

useBorrowings

---

# 11. Styling

Gunakan

Tailwind CSS

Tidak menggunakan:

Inline CSS

Style Attribute

CSS Framework lain

---

# 12. Icon

Gunakan:

Lucide React

Jangan mencampur icon library lain.

---

# 13. Routing

Gunakan React Router.

Semua route berada pada folder:

src/routes

---

# 14. Import Rules

Urutan import.

1 React

2 Third Party Library

3 Components

4 Hooks

5 Services

6 Types

7 Utils

8 Styles

---

# 15. Comments

Komentar hanya digunakan apabila diperlukan.

Hindari komentar yang menjelaskan hal yang sudah jelas dari nama fungsi.

---

# 16. Dummy Data

Semua Dummy Data berada pada:

src/data

Tidak boleh ditulis langsung di dalam komponen.

---

# 17. Constants

Semua konstanta berada pada:

src/constants

---

# 18. Utilities

Helper Function berada pada:

src/utils

Contoh

formatDate

formatCurrency

truncateText

---

# 19. Form Validation

Gunakan:

React Hook Form

+

Zod

Seluruh input wajib divalidasi.

---

# 20. Error Handling

Setiap halaman wajib memiliki:

Loading State

Empty State

Error State

404 State

---

# 21. Responsive Design

Desktop menjadi prioritas.

Gunakan utility Tailwind.

Jangan menggunakan media query manual kecuali benar-benar diperlukan.

---

# 22. Accessibility

Setiap input memiliki label.

Setiap button memiliki text atau aria-label.

Kontras warna harus jelas.

---

# 23. Performance

Gunakan:

React.memo

useMemo

useCallback

Hanya apabila benar-benar diperlukan.

Jangan melakukan optimasi berlebihan pada tahap awal.

---

# 24. Git Commit

Format commit.

feat:

fix:

refactor:

style:

docs:

test:

chore:

Contoh

feat: create dashboard page

fix: login form validation

docs: update sprint 2 documentation

---

# 25. Pull Request

Setiap perubahan harus:

- Build berhasil
- Tidak ada error TypeScript
- Tidak ada warning penting
- Sesuai Design System

---

# 26. AI Agent Rules

AI Agent wajib:

- Mengikuti seluruh struktur folder.
- Membuat komponen reusable.
- Menggunakan TypeScript.
- Menggunakan Tailwind CSS.
- Tidak menggunakan any.
- Tidak membuat kode duplikat.
- Mengikuti Design System.
- Mengikuti Layout Specification.
- Mengikuti Component Specification.
- Mengikuti Page Specification.
- Menghasilkan kode yang bersih, konsisten, dan mudah dipelihara.
