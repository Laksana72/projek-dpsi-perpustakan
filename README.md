# Sistem Informasi Perpustakaan

Aplikasi web manajemen perpustakaan modern untuk civitas akademika Universitas Ahmad Dahlan. Dibangun dengan **React + TypeScript** (frontend) dan **Laravel 13** (backend REST API).

**Live Demo:** [projek-dpsi-perpustakan.vercel.app](https://projek-dpsi-perpustakan.vercel.app)

---

## 👥 Tim Pengembang

| Nama | NIM | Peran |
|------|-----|-------|
| Aminudin Setya Wibawa | 2200016151 | Requirements, UI/UX, Frontend, Backend, Testing, Laporan |
| Laksana Yoga Kurniawan | 2200016055 | Requirements, UI/UX, Frontend, Backend, Testing, Hosting |
| Weka Hayu Pratista | 2200016004 | Requirements, UI/UX, Frontend |
| Dania Elsadig | 2406016055 | Requirements, UI/UX |

---

## ✨ Fitur

### Berdasarkan Role

| Role | Akses |
|------|-------|
| **Guest** (Publik) | Landing page, koleksi buku, about, bantuan, login |
| **User** (Mahasiswa/Dosen) | Dashboard, katalog, detail buku, peminjaman, riwayat, denda, profil |
| **Pustakawan** | Dashboard, validasi reservasi, kelola buku, peminjaman, pengembalian, profil |
| **Admin** | Semua fitur pustakawan + dashboard admin, kelola anggota, kategori, penerbit, denda, laporan |

### Fitur Umum

- Autentikasi dengan Laravel Sanctum (token-based)
- Role-based route protection (3 role)
- CRUD buku, kategori, penerbit, anggota, peminjaman, denda
- Validasi reservasi (approve/reject)
- Notifikasi toast (sonner)
- QR code peminjaman
- Dark mode
- Responsive (desktop, tablet, mobile)
- Lazy loading (React.lazy + Suspense)
- Error boundary global

---

## 🛠 Tech Stack

### Frontend

| Teknologi | Versi |
|-----------|-------|
| React | 19 |
| TypeScript | 5.7 |
| Vite | 6 |
| Tailwind CSS | 4 |
| React Router DOM | 7 |
| React Hook Form | 7 |
| Zod | 3 |
| Lucide React | - |
| Sonner | 1 |
| date-fns | 4 |
| Framer Motion | 11 |
| Recharts | 2 |
| Axios | 1 |

### Backend

| Teknologi | Versi |
|-----------|-------|
| PHP | ^8.3 |
| Laravel | ^13.8 |
| Laravel Sanctum | ^4.3 |
| SQLite (dev) / MySQL (production) | - |

---

## 📦 Instalasi

### Prasyarat

- Node.js 18+
- PHP 8.3+
- Composer
- SQLite (development) atau MySQL (production)

### Langkah-langkah

```bash
# Clone repository
git clone https://github.com/Laksana72/projek-dpsi-perpustakan.git
cd perpustakaan

# Install dependensi frontend
npm install

# Install dependensi backend
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Jalankan migrasi dan seeder
php artisan migrate:fresh --seed

# Jalankan development server
# Terminal 1: Backend
php artisan serve

# Terminal 2: Frontend
npm run dev
```

Frontend berjalan di `http://localhost:3000`, backend di `http://localhost:8000`.

---

## 🔑 Akun Testing

| Role | Username / Email | Password |
|------|-----------------|----------|
| **Admin** | `admin` / `admin@perpustakaan.ac.id` | `admin123` |
| **Pustakawan** | `pustakawan` / `pustakawan@perpustakaan.ac.id` | `pustakawan123` |
| **User** | `user` / `user@perpustakaan.ac.id` | `123456` |
| **User** | `ahmad.rizki@student.ac.id` | `password` |
| **User** | `siti.nurhaliza@student.ac.id` | `password` |

---

## 🚀 Deployment

### Frontend (Vercel)

Repository terhubung dengan Vercel — auto-deploy dari branch `main`.

**Environment variable yang diperlukan:**
```
VITE_API_URL=https://projek-dpsi-perpustakan-production-4a99.up.railway.app/api
```

### Backend (Railway)

Deployment menggunakan Dockerfile dengan PHP 8.4.

**Environment variable yang diperlukan:**
```
APP_ENV=production
APP_DEBUG=false
APP_KEY=<generate dengan php artisan key:generate>
APP_URL=https://projek-dpsi-perpustakan-production-4a99.up.railway.app
DB_CONNECTION=mysql
DB_HOST=<host>
DB_PORT=3306
DB_DATABASE=<database>
DB_USERNAME=<username>
DB_PASSWORD=<password>
FRONTEND_URL=https://projek-dpsi-perpustakan.vercel.app
```

---

## 📂 Struktur Proyek

```
perpustakaan/
├── app/                    # Backend Laravel
│   ├── Http/
│   │   ├── Controllers/Api/  # API controllers (11)
│   │   └── Middleware/        # RoleMiddleware, AdminMiddleware
│   ├── Models/               # Book, User, Borrowing, Fine, Category, Publisher
│   └── ...
├── bootstrap/
├── config/                # cors.php, database.php, sanctum.php, dll
├── database/
│   ├── migrations/          # 10 migration files
│   ├── factories/           # BookFactory, UserFactory
│   └── seeders/             # DatabaseSeeder
├── docs/                   # Dokumentasi (SRS, arsitektur, dll)
├── routes/
│   └── api.php             # Semua endpoint API
├── src/                    # Frontend React
│   ├── components/         # 30+ reusable components
│   │   ├── cards/
│   │   ├── feedback/       # Modal, ErrorBoundary, Skeleton, dll
│   │   ├── forms/          # Input, Select, SearchInput, dll
│   │   ├── layout/         # ProtectedRoute, PublicRoute, Header, Footer
│   │   ├── navigation/     # Sidebar, Pagination, Breadcrumb
│   │   └── ui/             # Button, Badge, Avatar, Tooltip, dll
│   ├── contexts/           # Auth, Theme, Loading, Notification
│   ├── hooks/              # useAuth
│   ├── layouts/            # GuestLayout, UserLayout, AdminLayout, PustakawanLayout
│   ├── pages/
│   │   ├── admin/          # 11 pages
│   │   ├── auth/           # LoginPage
│   │   ├── collection/     # CollectionPage
│   │   ├── help/
│   │   ├── landing/        # LandingPage
│   │   ├── pustakawan/     # 2 pages
│   │   ├── shared/         # NotFoundPage
│   │   └── user/           # 7 pages
│   ├── services/           # API service layer (13 files)
│   ├── styles/
│   └── types/
├── Dockerfile              # PHP 8.4 container
├── vercel.json             # SPA rewrites
└── vite.config.ts          # Vite config (port 3000, @ alias)
```

---

## 📖 API Endpoints

### Public
| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/login` | Login |
| GET | `/api/books` | Daftar buku (paginasi, filter) |
| GET | `/api/books/search` | Cari buku |
| GET | `/api/books/{id}` | Detail buku |

### Authenticated
| Method | Endpoint | Role | Deskripsi |
|--------|----------|------|-----------|
| POST | `/api/logout` | All | Logout |
| GET | `/api/user` | All | Profil user |
| PUT | `/api/user` | All | Update profil |
| PUT | `/api/user/password` | All | Ganti password |
| GET | `/api/dashboard/{role}` | Sesuai role | Statistik dashboard |
| POST/PUT/DELETE | `/api/books/*` | Admin/Pustakawan | CRUD buku |
| GET | `/api/categories` | All | Daftar kategori |
| POST/PUT/DELETE | `/api/categories/*` | Admin/Pustakawan | CRUD kategori |
| GET | `/api/publishers` | All | Daftar penerbit |
| POST/PUT/DELETE | `/api/publishers/*` | Admin/Pustakawan | CRUD penerbit |
| GET/POST/PUT/DELETE | `/api/members/*` | Admin | CRUD anggota |
| GET/POST/PUT/DELETE | `/api/borrowings/*` | All/Admin | CRUD peminjaman |
| POST | `/api/borrowings/{id}/approve` | Admin/Pustakawan | Setujui peminjaman |
| POST | `/api/borrowings/{id}/reject` | Admin/Pustakawan | Tolak peminjaman |
| POST | `/api/borrowings/{id}/return` | Admin/Pustakawan | Kembalikan buku |
| GET | `/api/returns` | Admin/Pustakawan | Data pengembalian |
| GET | `/api/fines` | Admin | Data denda |
| GET | `/api/fines/user` | User | Denda user |
| POST | `/api/fines/{id}/pay` | Admin/Pustakawan | Bayar denda |
| GET | `/api/history` | Admin | Riwayat |

---

## 📜 Scripts

### Frontend
| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Development server (port 3000) |
| `npm run build` | Build produksi |
| `npm run preview` | Preview build |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |

### Backend
| Script | Deskripsi |
|--------|-----------|
| `composer setup` | Setup lengkap |
| `composer dev` | Jalankan semua service |
| `composer test` | Jalankan test |
| `php artisan migrate:fresh --seed` | Reset DB + seeding |
| `php artisan books:fetch-covers` | Fetch cover dari Open Library |

---

## 🎨 Design System

- 30+ komponen reusable dengan varian, ukuran, dan state
- Design tokens: warna, tipografi, spacing, shadow, animasi
- Dark mode via CSS variables + Tailwind CSS v4 `@theme`
- Responsive: mobile-first, 4 breakpoints

---

## 📄 Dokumentasi

Dokumentasi lengkap tersedia di folder [`docs/`](./docs):
- SRS (Software Requirements Specification)
- Arsitektur sistem
- Spesifikasi komponen
- Design system
- Information architecture
- Sprint planning & project state
- Dan lainnya

---

**Proyek Akhir DPSI 2026 — Universitas Ahmad Dahlan**
