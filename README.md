# Library Management System - Frontend

Aplikasi web manajemen perpustakaan modern yang dibangun dengan React, TypeScript, dan Tailwind CSS.

## Tech Stack

| Teknologi | Versi |
|-----------|-------|
| React | 19 |
| TypeScript | 5.x |
| Vite | 6 |
| Tailwind CSS | 4 |
| React Router | 7 |
| React Hook Form | 7 |
| Zod | 3 |
| Lucide React | 0.468 |
| Sonner | 1.x |
| date-fns | 4 |
| Framer Motion | 11 |
| Recharts | 2 |

## Folder Structure

```
src/
├── assets/          # Images, icons, illustrations
├── components/      # Reusable UI components
│   ├── cards/       # Card components (StatCard, BookCard, ProfileCard, etc.)
│   ├── common/      # Barrel exports
│   ├── feedback/    # Modal, Alert, Toast, Skeleton, Spinner, ErrorBoundary
│   ├── forms/       # Input, Select, Checkbox, Radio, Switch, SearchInput
│   ├── layout/      # Header, Footer, ProtectedRoute, PublicRoute, ContentContainer
│   ├── navigation/  # Sidebar, SidebarItem, Pagination, Breadcrumb, NavbarItem
│   ├── tables/      # Table component
│   └── ui/          # Button, Badge, Avatar, Chip, Divider, Tooltip, Dropdown
├── constants/       # App constants (routes, pagination, API endpoints)
├── contexts/        # React Context providers
│   ├── AuthContext  # Authentication state + localStorage persistence
│   ├── ThemeContext # Light/dark mode toggle
│   ├── NotificationContext # Sonner toast wrapper
│   └── LoadingContext # Global loading overlay
├── data/            # Dummy data (books, users, borrowings, returns, etc.)
├── hooks/           # Custom hooks (useAuth)
├── layouts/         # Layout components (GuestLayout, UserLayout, AdminLayout)
├── pages/           # Page components
│   ├── landing/    # LandingPage
│   ├── auth/       # LoginPage
│   ├── user/       # Dashboard, Catalog, DetailBook, Borrowings, History, Profile
│   ├── admin/      # AdminDashboard, ReturnManagement
│   └── shared/     # NotFoundPage
├── services/        # Service layer (reads dummy data, ready for API integration)
├── styles/          # CSS: design tokens, typography, animations, dark mode
├── types/           # TypeScript interfaces
└── utils/           # Utility functions (cn)
```

## Installation

```bash
npm install
```

## Running

```bash
npm run dev
```

Aplikasi berjalan di `http://localhost:5173`.

## Scripts

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Menjalankan development server |
| `npm run build` | Build produksi (TypeScript + Vite) |
| `npm run preview` | Preview build produksi |
| `npm run lint` | ESLint check |
| `npm run format` | Prettier format |

## Dummy Accounts

| Role | Username | Password |
|------|----------|----------|
| User | `user` | `123456` |
| Admin | `admin` | `admin123` |

## User Roles

### Guest
- Landing Page, Login, melihat koleksi buku

### User (Mahasiswa/Dosen)
- Dashboard, Katalog Buku, Detail Buku
- Peminjaman Saya, Riwayat, Denda
- Profil

### Admin (Petugas Perpustakaan)
- Dashboard Admin, Kelola Buku, Data Peminjaman
- Data Pengembalian, Riwayat, Profil

## Routes

| Route | Layout | Access |
|-------|--------|--------|
| `/` | Guest | Public |
| `/login` | Guest | Guest only |
| `/dashboard` | User | User |
| `/catalog` | User | User |
| `/book/:id` | User | User |
| `/borrowings` | User | User |
| `/history` | User | User |
| `/profile` | User | User |
| `/admin/dashboard` | Admin | Admin |
| `/admin/returns` | Admin | Admin |
| `*` | - | Any (404) |

## Key Features

- **Authentication**: Dummy auth dengan localStorage persistence & Remember Me
- **Route Protection**: Guest/User/Admin role-based guards
- **Theme**: Light/Dark mode toggle
- **Lazy Loading**: Code splitting via React.lazy untuk setiap halaman
- **Global State**: Auth, Theme, Loading, Notification contexts
- **Service Layer**: 6 service files siap diintegrasikan dengan REST API
- **Error Boundary**: Global error handling dengan retry
- **Responsive**: Desktop, Laptop, Tablet, Mobile
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Dummy Data**: 8+ data modules siap diganti API

## Design System

- Design tokens: colors, typography, spacing, shadows, animations
- 25+ reusable components with variants, sizes, states
- Dark mode CSS variables (prepared, toggle active)
- Tailwind CSS v4 with @theme configuration

## Backend Integration

Seluruh data dipisahkan dari UI melalui:
- `src/data/` — dummy JSON data
- `src/services/` — async service functions (ready for API calls)

Untuk integrasi backend:
1. Ganti file di `src/data/` dengan API responses
2. Update `src/services/*.service.ts` dengan fetch/axios calls
3. Struktur komponen tidak perlu diubah
