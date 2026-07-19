# Project State

Project : Library Management System Frontend

Version : 1.0.0

Status : Development

Last Updated : 2026-07-13

---

# Project Overview

Library Management System merupakan aplikasi web yang dikembangkan untuk memudahkan pengelolaan perpustakaan secara digital.

Repository ini hanya berisi pengembangan Frontend.

Seluruh halaman dikembangkan berdasarkan desain Figma dan dokumentasi pada folder docs/.

Backend akan dikembangkan secara terpisah.

---

# Current Phase

✅ Documentation

✅ Frontend Development

⬜ API Integration

⬜ Production Deployment

---

# Overall Progress

Documentation

████████████████████ 100%

Frontend

████████████████████████████ 100%

Backend Integration

□□□□□□□□□□□□□□□ 0%

Testing

□□□□□□□□□□□□□□□ 0%

Deployment

□□□□□□□□□□□□□□□ 0%

---

# Documentation Status

| Document | Status |
|----------|--------|
| context.md | ✅ Complete |
| srs.md | ✅ Complete |
| information_architecture.md | ✅ Complete |
| design_system.md | ✅ Complete |
| layout_specification.md | ✅ Complete |
| component_specification.md | ✅ Complete |
| page_specification.md | ✅ Complete |
| architecture.md | ✅ Complete |
| coding_guidelines.md | ✅ Complete |
| tech_stack.md | ✅ Complete |
| sprint_plan.md | ✅ Complete |
| backlog.md | ✅ Complete |

---

# Current Sprint

Sprint 15

Status

Completed

---

# Completed Tasks

## Sprint 10 - My Borrowings

- BorrowingsPage built with complete structure:
  - Summary Cards: 4 StatCards (Sedang Dipinjam, Jatuh Tempo Minggu Ini, Sudah Dikembalikan, Total Denda) with computed data
  - Search: realtime filter by title/author
  - Filter: Status (Dipinjam/Jatuh Tempo/Terlambat/Dikembalikan) and Urutkan (Terbaru/Terlama/Judul A-Z/Z-A) Selects + Reset Filter
  - Table (desktop): columns No, Cover, Judul Buku, Penulis, Tanggal Pinjam, Jatuh Tempo, Status badge, Denda, Aksi (Detail/Perpanjang/Kembalikan)
  - Card list (mobile): compact card view with cover, title, badge, dates, actions
  - Dynamic status computation: Dipinjam (green), Jatuh Tempo (yellow, ≤7 days), Terlambat (red, past due), Dikembalikan (blue)
  - Fine calculation: Rp2,000/day overdue
  - Pagination: 10 items/page
  - Placeholder Modal for Perpanjang and Kembalikan actions
  - Empty state with Katalog Buku link

## Sprint 9 - Book Detail

- Book type extended with optional fields: language, edition, addedDate, location, callNumber
- books.ts updated with complete dummy data for all fields
- DetailBookPage built with complete structure:
  - Breadcrumb: Katalog Buku > Detail Buku with navigation links
  - Two-column layout (desktop): cover (300x420px, rounded-16px, shadow-md) + info grid (Penulis, Kategori, ISBN, Penerbit, Tahun, Halaman, Bahasa, Edisi, Rak, Call Number, Tanggal, Status badge)
  - Synopsis section with expand/collapse toggle ("Lihat Selengkapnya") for long text (>300 chars)
  - Action buttons: Pinjam Buku (→ /borrowings), Kembali ke Katalog (→ /catalog)
  - Related Books: max 4 books from same category via BookCard grid
  - Empty state when book ID not found

## Sprint 8 - Book Catalog

- Book type updated: added 'Reserved' and 'Lost' status values
- BookCard updated: added optional `year` prop, support for 'Reserved' (warning/yellow) and 'Lost' (default/gray) status badges, Indonesian status labels (Tersedia, Dipinjam, Reservasi, Hilang)
- CatalogPage built with complete structure:
  - Page header with title "Katalog Buku" and description
  - Search section with realtime filtering by title, author, ISBN
  - Filter section: Kategori, Status, Tahun Terbit, Urutkan (Judul A-Z, Z-A, Terbaru, Terlama) Selects + Reset Filter button
  - Book Grid responsive (4/3/2/1 columns) with BookCards showing cover, title, author, category, year, status badge, detail button
  - Pagination (12 items per page) using existing Pagination component
  - Empty state with reset action when no results match

## Sprint 7 - User Dashboard

- UserLayout updated with Indonesian sidebar labels (Dashboard, Katalog Buku, Peminjaman Saya, Riwayat, Denda, Profil, Keluar)
- UserLayout header title dynamically set based on current route
- DashboardPage built with complete structure:
  - Greeting Section: "Halo, {user.name}" with welcome message and formatted Indonesian date
  - Statistics Section: 4 StatCards (Buku Dipinjam, Riwayat, Total Denda, Buku Tersedia) from dashboard.ts dummy data
  - Popular Books: 4 BookCards from popularBooks data, grid 4/2/1 columns
  - Quick Access: 4 interactive Cards linking to Katalog Buku, Peminjaman, Riwayat, Profil
  - All sections responsive (4 col desktop, 2 col tablet, 1 col mobile)

## Sprint 6 - Login Page

- AuthContext updated with username-based dummy authentication (user/123456, admin/admin123)
- LoginPage built with full-screen background image, primary overlay, centered Login Card
- Login Card (420px desktop, 380px tablet, 90% mobile): Logo (64px), "Selamat Datang" heading, subtitle, Username/Email input, Password input with show/hide toggle, "Ingat Saya" checkbox, "Lupa Password?" link, "Masuk" button, error Alert
- Form validation using React Hook Form + Zod (username required, password required)
- Loading state on login button during authentication
- Error alert for invalid credentials via Alert component
- Automation redirect via PublicRoute (user → /dashboard, admin → /admin/dashboard)
- All inputs use reusable Input component with aria-labels
- Password show/hide toggle using Eye/EyeOff icons
- Responsive: card centers with max-width, background covers full viewport

## Sprint 5 - Landing Page

- Navbar updated with `variant` prop (primary/default) for landing page styling
- Navbar menu labels in Indonesian (Beranda, Koleksi, Tentang, Bantuan)
- Navbar fixed position with responsive mobile hamburger menu
- GuestLayout passes `variant` to Navbar and Footer based on route
- Footer updated with `variant` prop (primary dark bg for landing)
- Footer labels in Indonesian (Navigasi, Kontak, Jam Operasional)
- FeatureCard component created (icon, title, description with hover effect)
- LandingPage with complete structure:
  - Hero Section: gradient background with image overlay, heading "Temukan Ilmu, Raih Masa Depan", subheading, search input, CTA buttons
  - Features Section: 4 FeatureCards (Koleksi Lengkap, Reservasi Online, Notifikasi Pintar, Akses Cepat)
  - Book Collection Preview: responsive grid (4/2/1 columns), max 8 books from dummy data, realtime search filtering
- Search filters books by title, author, and category
- Empty state shown when no books match search
- All animations use existing design system animation classes
- Responsive: 4 columns desktop, 2 columns tablet, 1 column mobile

---

## Sprint 1 - Project Bootstrap & Foundation

- React Project Initialization
- TypeScript Configuration (Strict Mode)
- Vite Build Setup
- Tailwind CSS v4 Configuration with Design System Tokens
- ESLint + Prettier Configuration
- React Router Setup with All Routes
- Folder Structure (src/, components/, layouts/, pages/, routes/, hooks/, services/, contexts/, types/, utils/, constants/, assets/, data/, styles/)
- Layouts: GuestLayout, UserLayout, AdminLayout (all Placeholder)
- Reusable Components: Button, Input, Card, Modal, Badge, Avatar, Table, Pagination, Search, Sidebar, Header, Footer, Loader, Skeleton, EmptyState, ErrorState
- Placeholder Pages for All Routes
- Dummy Data: books, users, borrowings, returns, history, dashboard, profile, admin_dashboard
- Global Styles with Design System Variables
- Absolute Import (@/) Configuration
- Route Structure with Guest/User/Admin areas
- 404 Not Found Page

## Sprint 2 - Design System Foundation

- Theme tokens: Primary, Secondary, Success, Danger, Warning, Info, Neutral colors
- Color palette with hover, light, and dark variants
- Typography scale: H1-H5, Body Large/Body/Small, Caption, Button, Label
- Spacing system (4-96px, 8px scale)
- Border radius tokens (xs through full)
- Shadow tokens (sm through 2xl)
- Z-index layers (dropdown, sticky, fixed, modal, popover, tooltip, toast)
- Animation tokens and keyframes (fade, slide, scale, shimmer, pulse-soft)
- Responsive breakpoints (Mobile 390px, Tablet 768px, Laptop 1024px, Desktop 1280px, Large 1440px)
- Custom scrollbar styles
- Container utilities (max-width 1440px, padding 32px)
- Utility classes (flex-center, flex-between, grid-auto-fill, surface, card-hover, hover-lift, hover-scale, focus-ring, sr-only, scrollbar-thin, scrollbar-hidden, text utilities)
- Dark mode CSS custom properties structure (prepared, not active)
- Tailwind v4 @theme configuration with all design tokens

## Sprint 3 - Reusable Components

- **Form components**: Input (enhanced), Textarea, Select, Checkbox, Radio, Switch, SearchInput
- **UI components**: Button (enhanced with fullWidth, leftIcon, rightIcon, outline variant), Badge (enhanced with size, outline), Avatar (enhanced with status indicator, xl size), Chip, Divider, Tooltip, Dropdown
- **Card components**: Card (enhanced with outlined/elevated/interactive variants), StatCard, BookCard, ProfileCard
- **Table components**: Table (with Header, Body, Row, Head, Cell)
- **Navigation components**: Pagination, Breadcrumb, Sidebar, SidebarItem, NavbarItem
- **Feedback components**: Modal (enhanced with footer, closeOnOverlayClick, sizes), Alert, Toast (Sonner wrapper), Loader, Skeleton, Spinner, EmptyState, ErrorState
- **Layout components**: Header, Footer
- All components have: variant, size, disabled state, loading state, hover state, active state, focus state
- All components responsive using Tailwind responsive utilities
- All components exported from common/index.ts barrel file

---

# Folder Structure

Current Structure

docs/

src/

├── app/

├── assets/

│   ├── images/

│   ├── icons/

│   ├── illustrations/

│   ├── logo/

│   └── fonts/

├── components/

│   ├── ui/ (Button, Badge, Avatar, Chip, Divider, Tooltip, Dropdown)

│   ├── forms/ (Input, Textarea, Select, Checkbox, Radio, Switch, SearchInput)

│   ├── cards/ (Card, StatCard, BookCard, ProfileCard)

│   ├── tables/ (Table)

│   ├── navigation/ (Pagination, Breadcrumb, Sidebar, SidebarItem, NavbarItem)

│   ├── feedback/ (Modal, Alert, Toast, Loader, Skeleton, Spinner, EmptyState, ErrorState)

│   ├── layout/ (Header, Footer)

│   └── common/ (index re-exports)

├── layouts/ (GuestLayout, UserLayout, AdminLayout)

├── pages/

│   ├── landing/ (LandingPage)

│   ├── auth/ (LoginPage)

│   ├── user/ (DashboardPage, CatalogPage, DetailBookPage, BorrowingsPage, HistoryPage, ProfilePage)

│   ├── admin/ (AdminDashboardPage)

│   └── shared/ (NotFoundPage)

├── routes/ (router.tsx)

├── hooks/

├── services/

├── contexts/

├── types/ (index.ts)

├── utils/ (cn.ts)

├── constants/ (index.ts)

└── styles/

    ├── globals.css (entry point)

    ├── tailwind.css (@import 'tailwindcss' + @theme tokens)

    ├── base.css (CSS reset + base element styles)

    ├── typography.css (heading/body/caption utility classes)

    ├── animation.css (animation keyframes + utilities)

    ├── utilities.css (custom utility classes)

    ├── tokens/

    │   ├── colors.css

    │   ├── typography.css

    │   ├── spacing.css

    │   ├── radius.css

    │   ├── shadows.css

    │   ├── z-index.css

    │   ├── breakpoints.css

    │   └── animation.css

    ├── theme/

    │   ├── index.css

    │   └── dark.css (dark mode CSS variables, prepared)

    └── variables/

        └── index.css (CSS custom properties)

---

# Current Technology

React 19

TypeScript (Strict Mode)

Vite 6

Tailwind CSS v4

Lucide React

React Router DOM 7

React Hook Form

Zod

Axios

clsx + tailwind-merge

date-fns

Sonner

Framer Motion

Recharts

ESLint 9

Prettier

---

## Sprint 15 - Final QA, Optimization & Project Completion

- Code review: no unused imports, no console.log (except ErrorBoundary componentDidCatch), no TODO/FIXME, no `any` types found
- Build and lint pass with zero errors and zero warnings
- Cleaned empty `src/app/` and `src/routes/` directories
- Folder structure verified against architecture documentation
- All 10+ routes verified for correct layout assignment and role-based access
- All page components use React.lazy for code splitting
- Dark mode CSS variables ready, toggle active via ThemeContext
- ErrorBoundary integrated at top of component tree
- Service layer (6 files) ready for backend API integration
- README.md created with full documentation:
  - Tech stack, folder structure, installation, scripts
  - Dummy accounts (user/123456, admin/admin123)
  - User roles, routes table, key features
  - Backend integration guide
- Project is ready for Backend Team integration

## Sprint 14 - Frontend Integration & Application State

- AuthContext updated with localStorage persistence (user, token, remember me), auto-restore on page load, dummy token field
- auth-context.tsx updated with `token` field and `remember` parameter on login
- ThemeContext created: light/dark mode toggle, persists to localStorage, applies `dark` class to `<html>` element (uses existing dark.css variables)
- NotificationContext created: wraps Sonner toast with success/error/info/warning methods, provides `<Toast />` globally
- LoadingContext created: global loading overlay with Spinner + backdrop blur, `withLoading` async helper
- ErrorBoundary component created: catches React errors, displays friendly "Terjadi Kesalahan" UI with Muat Ulang and Beranda buttons, shows stack trace in dev mode
- Service layer created (6 files):
  - `auth.service.ts`: loginService, validateToken
  - `book.service.ts`: getAllBooks, getBookById, searchBooks, getBooksByCategory, getCategories
  - `borrowing.service.ts`: getAllBorrowings, getBorrowingsByUserId, getActiveBorrowings, getOverdueBorrowings, searchBorrowings
  - `return.service.ts`: getAllReturns, getReturnsByUserId, getReturnsToday, searchReturns
  - `history.service.ts`: getAllHistory, searchHistory
  - `profile.service.ts`: getProfile
  - Each service reads from `src/data/` dummy data with simulated async delay
- Router updated: all page components use `React.lazy()` for code splitting into separate chunks
- App.tsx reorganized: wraps app in ErrorBoundary > ThemeProvider > AuthProvider > LoadingProvider > NotificationProvider > Suspense > RouterProvider
- LoginPage updated: passes `rememberMe` to `login()` for localStorage persistence
- UserLayout and AdminLayout updated: added Moon/Sun theme toggle button in Header, uses `useTheme` hook
- Build and lint pass with zero errors/warnings

## Sprint 13 - Return Management Page

- Return type expanded: added `borrowDate`, `dueDate`, `nim` fields; extended status to `'On Time' | 'Late' | 'Pending' | 'Lost'`
- `src/data/returns.ts` updated with 13 rich dummy records including On Time, Late, Pending, and Lost statuses; added today's return for "Pengembalian Hari Ini" stat
- ReturnManagementPage built with complete structure:
  - Summary Cards: 4 StatCards (Pengembalian Hari Ini, Belum Dikembalikan from borrowings, Terlambat, Total Denda)
  - Search: realtime filter by Nama Anggota, Nomor Anggota (nim), Judul Buku
  - Filter: Status (Tepat Waktu/Terlambat/Menunggu/Hilang), Kategori Buku (dynamic from books), Tanggal Pengembalian (date input), Urutkan (Terbaru/Terlama/Nama Anggota/Judul Buku) + Reset Filter
  - Table (desktop): 12 columns (No, Nomor Anggota, Nama Anggota, Cover, Judul Buku, Tgl Pinjam, Jatuh Tempo, Tgl Kembali, Hari Terlambat, Denda, Status badge, Aksi with Detail/Konfirmasi/Cetak)
  - Card list (mobile): compact card view with cover, title, member info, dates, late days, fine, actions
  - Status Badge: Tepat Waktu (success/hijau), Terlambat (danger/merah), Menunggu (warning/kuning), Hilang (default/abu)
  - Actions: Detail → /book/:id, Konfirmasi (Modal placeholder), Cetak Bukti (Modal placeholder)
  - Pagination: 10 items/page
  - Loading state: Skeleton cards, search, table
  - Empty state: "Belum ada data pengembalian" + Refresh button
  - Error state: retry button
  - Route /admin/returns registered in router
  - Responsive: table → card list on mobile, sidebar drawer on mobile
- Build and lint pass with zero errors/warnings

## Sprint 12 - Admin Dashboard

- `src/components/cards/QuickActionCard.tsx` created: icon + title button with hover shadow, onClick navigation
- `src/components/cards/ActivityCard.tsx` created: avatar + name + action description + time, reusable for activity lists
- `src/components/cards/ProgressCard.tsx` created: progress bars with label/value/percentage/color for book status visualization
- `src/data/admin_dashboard.ts` enriched with computed stats (overdue, fines, returns), trends percentages, 10 recent activities with realistic data, book status counts (available/borrowed/reserved/lost), top borrowed book IDs, and full data slices
- AdminLayout sidebar labels updated to Indonesian: Dashboard, Kelola Buku, Data Peminjaman, Data Pengembalian, Riwayat, Profil, Keluar
- AdminDashboardPage built with complete structure:
  - Page Header: "Dashboard Admin" with description
  - Search: realtime filter across activities, borrowings, returns, and top books
  - Summary Statistics: 6 StatCards (Total Buku, Total Anggota, Buku Dipinjam, Buku Terlambat, Pengembalian, Total Denda) with trend indicators (up/down arrows + percentage)
  - Quick Actions: 6 QuickActionCards (Tambah Buku, Kelola Buku, Data Peminjaman, Data Pengembalian, Laporan, Pengaturan) navigating to routes
  - Recent Activities: up to 10 ActivityCards with avatar, name, action, time
  - Book Status: ProgressCard with 4 bars (Tersedia/Dipinjam/Reservasi/Hilang) + percentage
  - Latest Borrowings: Table (desktop) + Card list (mobile) with columns No, Nama Anggota, Judul Buku, Tanggal Pinjam, Jatuh Tempo, Status badge, Detail action
  - Latest Returns: Table (desktop) + Card list (mobile) with columns No, Nama Anggota, Judul Buku, Tanggal Kembali, Status badge (Tepat Waktu/Terlambat), Denda, Detail action
  - Top Borrowed Books: 5 BookCards in responsive grid, clickable to book detail
  - Loading state: Skeleton cards for all sections
  - Error state: retry button
  - Empty state for each section when search yields no results
  - Responsive: 3-col stats → 2-col → 1-col, sidebar drawer on mobile, table → card list, quick actions 6-col → 3-col → 2-col
- Build and lint pass with zero errors/warnings

## Sprint 11 - Borrowing History & User Profile

- History type expanded: added `bookId`, extended status to `Returned | Late | Lost`
- `src/data/history.ts` updated with 15 rich dummy records including Late and Lost items with fines
- HistoryPage built with complete structure:
  - Summary Cards: 4 StatCards (Total Peminjaman, Sudah Dikembalikan, Terlambat, Total Denda) with computed data
  - Search: realtime filter by judul buku, penulis, ISBN
  - Filter: Status (Dikembalikan/Terlambat/Hilang), Kategori, Tahun, Urutkan (Terbaru/Terlama/Judul A-Z/Z-A) + Reset Filter
  - Table (desktop): columns No, Cover, Judul Buku, Tanggal Pinjam, Tanggal Kembali, Status badge, Denda, Detail action
  - Card list (mobile): compact card view with cover, title, badge, dates, fine
  - Status Badge: Returned (success/hijau), Late (danger/merah), Lost (default/abu)
  - Detail button navigates to /book/:bookId
  - Pagination: 10 items/page
  - Loading state: Skeleton cards, search, table
  - Empty state: "Belum ada riwayat peminjaman" + Lihat Katalog Buku button
  - Error state: retry button
  - Data lookup from books.ts for author, category, year enrichment

- Profile type extended with optional fields: phoneNumber, faculty, address
- `src/data/profile.ts` updated with phone, faculty, address fields
- ProfilePage built with complete structure:
  - Two-column responsive layout (1/3 left + 2/3 right on desktop, 1 column on mobile/tablet)
  - Left column: Profile Information card with Avatar, Nama, Nomor Anggota (badge), Email, Nomor Telepon, Program Studi, Fakultas, Alamat
  - Right top: Membership Information card with Nomor Anggota, Jenis Anggota, Tanggal Bergabung, Masa Berlaku, Status Keanggotaan (Badge Active/Expired)
  - Right middle: Borrowing Statistics (4 StatCards: Total Dipinjam, Sedang Dipinjam from active borrowings, Sudah Dikembalikan, Total Denda)
  - Right bottom: Account Settings (3 buttons: Edit Profil placeholder, Ubah Password placeholder, Keluar with logout modal)
  - Logout Modal: confirmation dialog with Batal/Keluar buttons, calls logout() + navigates to /
  - Cards with hover shadow effect
  - Loading state: Skeleton profile, membership, stats
  - Empty state: "Data profil tidak tersedia" with refresh
  - Error state: retry button

# Pending Tasks

- Integrasi Backend & REST API
- Production Deployment

---

# Next Phase

Backend Integration

API Integration

Production Deployment

---

# Risks

- Perubahan desain Figma dapat memengaruhi implementasi.
- Integrasi Backend mungkin memerlukan penyesuaian pada layer services.
- Perubahan requirement harus diperbarui pada seluruh dokumen terkait.

---

# Notes

- Seluruh pengembangan menggunakan Dummy Data.
- Seluruh halaman harus mengikuti Design System.
- AI Agent wajib membaca folder docs/ sebelum memulai Sprint baru.
- project_state.md harus diperbarui setiap Sprint selesai.

---

# AI Agent Instructions

Sebelum memulai pekerjaan:

1. Baca project_state.md.
2. Identifikasi Sprint yang sedang berjalan.
3. Periksa task yang telah selesai.
4. Jangan mengulang pekerjaan yang sudah selesai.
5. Ikuti sprint_plan.md sebagai acuan implementasi.
6. Perbarui file ini setelah Sprint selesai.

---

# Changelog

## Version 1.0.0

- Dokumentasi awal selesai.
- Sprint 1 completed: Project Bootstrap & Foundation
- React project initialized with Vite + TypeScript
- Folder structure created per Architecture
- Tailwind CSS configured with Design System tokens
- All reusable components created
- Layouts created (Guest, User, Admin)
- Routing configured with placeholder pages
- Dummy data created for all modules
- ESLint, Prettier, TypeScript Strict Mode configured
- Sprint 2 completed: Design System Foundation
- Theme tokens organized in tokens/ directory
- Typography scale with utility classes
- Color palette with full variants (hover, light, dark)
- Spacing, radius, shadow, z-index tokens
- Animation keyframes and utility classes
- Custom utility classes (container, scrollbar, flex, grid, surface, hover effects)
- Responsive breakpoints defined
- Dark mode CSS structure prepared
- Tailwind v4 @theme configuration with all design tokens
- Sprint 3 completed: Reusable Components
- 25+ reusable components created (Button, Input, Textarea, Select, Checkbox, Radio, Switch, Card, StatCard, BookCard, ProfileCard, Badge, Chip, Avatar, Divider, Tooltip, Dropdown, Modal, Alert, Toast, Loader, Skeleton, Spinner, EmptyState, ErrorState, Table, Pagination, Breadcrumb, Sidebar, SidebarItem, NavbarItem, Header, Footer, SearchInput)
- All components have variants, sizes, disabled/loading/hover/active/focus states
- Barrel export from common/index.ts
- Sprint 4 completed: Global Layout
- Guest/User/Admin layouts with responsive sidebars, headers, navbars, footers
- Auth context, route guards, router update
- Sprint 5 completed: Landing Page
- Navbar with primary variant, Indonesian labels, fixed position, mobile hamburger
- Footer with primary dark variant, Indonesian labels
- FeatureCard component created
- LandingPage with Hero, Features, and Book Preview sections
- Real-time search filtering from books dummy data
- Responsive grid (4/2/1 columns)
- Empty state for no search results
- Sprint 6 completed: Login Page
- LoginPage with background image, overlay, centered card
- React Hook Form + Zod validation
- Dummy authentication (user/123456, admin/admin123) with role-based redirect
- Password show/hide toggle, Remember Me checkbox, Forgot Password placeholder
- Error alert for invalid credentials
- Sprint 7 completed: User Dashboard
- UserLayout with Indonesian sidebar labels, dynamic header title
- DashboardPage with Greeting, Statistics (4 StatCards), Popular Books (4 BookCards), Quick Access (4 interactive Cards)
- Responsive 4/2/1 column grids
- Indonesian date formatting in greeting
- Sprint 8 completed: Book Catalog
- BookCard updated with year prop, Reserved/Lost status, Indonesian labels
- CatalogPage with search, filters (category/status/year/sort), paginated book grid (12/page)
- Responsive grid (4/3/2/1 columns), empty state with reset
- Sprint 9 completed: Book Detail
- Book type extended with language, edition, addedDate, location, callNumber fields
- DetailBookPage with breadcrumb, two-column layout (cover + info), synopsis expand/collapse, related books same-category, action buttons, empty state
- Sprint 10 completed: My Borrowings
- BorrowingsPage with summary cards, search, filter, table (desktop) + card list (mobile), dynamic status badges, fine computation, pagination, placeholder modals
- Sprint 11 completed: Borrowing History & User Profile
- HistoryPage with summary cards, search, filters, table + card list, status badges, pagination, skeleton/empty/error states
- ProfilePage with 2-column layout, profile info, membership, borrowing statistics, account settings, logout modal
- Sprint 12 completed: Admin Dashboard
- AdminDashboardPage with 6 StatCards, QuickActions, Activities, BookStatus progress, Latest Borrowings/Returns tables, Top Borrowed Books
- New reusable components: QuickActionCard, ActivityCard, ProgressCard
- Sprint 13 completed: Return Management Page
- ReturnManagementPage with 4 StatCards, search, filter, table + card list, status badges, pagination, confirmation/print modals
- Return type expanded with borrowDate, dueDate, nim, extended statuses
- Sprint 14 completed: Frontend Integration & Application State
- AuthContext with localStorage persistence, ThemeContext (light/dark), NotificationContext (Sonner), LoadingContext (overlay)
- ErrorBoundary, service layer (6 files), lazy loading via React.lazy, all providers integrated in App.tsx
- Theme toggle in UserLayout/AdminLayout headers
- Sprint 15 completed: Final QA, Optimization & Project Completion
- Code review, cleanup, build/lint zero errors/warnings, README.md, project_state.md finalization
- Frontend ready for Backend Team integration

## Sprint 4 - Global Layout

- GuestLayout: Navbar + Outlet + Footer with route-aware variant
- UserLayout: Sidebar + Header + ContentContainer
- AdminLayout: Sidebar + Header + ContentContainer
- AuthContext with dummy login/logout
- ProtectedRoute and PublicRoute guards
- Router updated with route guards
- Sidebar responsive drawer with overlay on mobile
